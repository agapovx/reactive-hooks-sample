import { ajax } from 'rxjs/ajax';
import { Observable, BehaviorSubject, Subject, combineLatest, forkJoin, from } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { getPagination, selectStoryFields } from 'utils';
import axios from 'axios';

const baseUrl: string = 'https://hacker-news.firebaseio.com/v0/';
const newStoriesUrl: string = `${baseUrl}newstories.json`;
const storyUrl: string = `${baseUrl}item/`;

export interface Story {
	url: string;
	title: string;
	by: string;
	id: number;
}

export interface PaginationValues {
	from: number;
	to: number;
}

const storiesPerPage: number = 10;

export interface IStoryService {
	setCurrentPage: (pageNumber: number) => void;
	loadStories: () => void;
	avaliablePages$: Observable<number[]>;
	stories$: Observable<Story[]>;
}
/**
 * Класс, хранящий в себе потоки актуального списка stories, страниц для пагинации
 * и функционал для управления потоками
 * @export
 * @class StoryServices
 * @implements {IStoryService}
 */
export class StoryServices implements IStoryService {
	private static instance: StoryServices;

	private storyIdsSubject = new Subject<number[]>();
	private storyIds$: Observable<number[]>;

	private pagePaginationValuesSubject = new BehaviorSubject<PaginationValues>({ from: 0, to: 1 });
	private avaliablePagesSubject = new BehaviorSubject<number>(0);

	public avaliablePages$: Observable<number[]>;

	private _storiesCache: { [key: number]: Observable<Story> } = {};
	public stories$: Observable<Story[]>;

	static get sharedInstace(): StoryServices {
		if (!StoryServices.instance) {
			StoryServices.instance = new StoryServices();
		}
		return StoryServices.instance;
	}

	constructor() {
		this.storyIds$ = this.storyIdsSubject.asObservable();
		this.stories$ = this._combineStoryAndPages();
		this.avaliablePages$ = this._combinePageValues();
	}

	public setCurrentPage(currentPage: number) {
		this.pagePaginationValuesSubject.next({
			...this.pagePaginationValuesSubject.value,
			to: currentPage,
			from: --currentPage
		});
	}

	public loadStories() {
		ajax.getJSON<number[]>(newStoriesUrl).pipe(takeUntil(this.storyIdsSubject)).subscribe({
			next: (storyIds) => {
				this.storyIdsSubject.next(storyIds);
				this.avaliablePagesSubject.next(Math.round(storyIds.length / storiesPerPage));
			}
		});
	}

	private _combinePageValues(): Observable<number[]> {
		const stream$ = combineLatest(
			this.pagePaginationValuesSubject.asObservable(),
			this.avaliablePagesSubject.asObservable()
		).pipe(
			map(([ paginationValues, avaliablePagesCount ]) => getPagination(paginationValues.to, avaliablePagesCount))
		);
		return stream$;
	}

	private _combineStoryAndPages(): Observable<Story[]> {
		const stream$ = combineLatest(this.storyIds$, this.pagePaginationValuesSubject.asObservable()).pipe(
			map(([ allstoriesArray, paginationValues ]) =>
				allstoriesArray.slice(paginationValues.from * storiesPerPage, paginationValues.to * storiesPerPage)
			),
			mergeMap((storyIds) => {
				return forkJoin(storyIds.map((storyId) => this._getStoryById(storyId)));
			})
		);
		return stream$ as Observable<Story[]>;
	}

	private _getStoryById(storyId: number): Observable<Story> {
		this._storiesCache[storyId] = this._storiesCache[storyId] || this._fetchStoryById(storyId);
		return this._storiesCache[storyId];
	}

	private _fetchStoryById(storyId): Observable<Story> {
		return from(axios.get(`${storyUrl + storyId}.json`).then(({ data }) => data && selectStoryFields(data)));
	}
}
