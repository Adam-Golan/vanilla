import './style/dist/style.css';
import { Navigation } from '@services';
console.log(Navigation);

// Playground
import { Link } from "@shared";
import { ILink } from '@shared/components/link/types';

const app = document.getElementById('app');
const data: ILink = {
    href: '/exmples',
    text: 'examples',
};
const args: [ILink, () => void] = [data, () => console.log('clicked')];
app?.append(new Link(...args));