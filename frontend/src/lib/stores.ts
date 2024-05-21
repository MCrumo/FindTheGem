import { writable, readable, type Writable } from 'svelte/store';
import PatentsData from './mocked_data/patents.json';
import Patent from './domain/patent';

export const headers = readable(PatentsData.headers);
export const samples: Writable<Patent[]> = writable(PatentsData.samples.map((sample) => new Patent(sample.id, sample)));
