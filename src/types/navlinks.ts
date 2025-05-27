
export interface NavLink {
    name: string;
    href: string;
}

export default interface NavLinks {
    [key: string]: NavLink[];
}
