export default interface PostObject {
    id: string;
    title: string;
    content: string;
    type: string;
    publisher: string;
    date: string;
    modified: string;
    tags: string[];
    event: string;
    featured_image: string;
    category: string;
    author?: string; // Optional for news type
    publisherID?: string;
}