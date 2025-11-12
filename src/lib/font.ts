/* eslint-disable @typescript-eslint/no-unused-vars */
import { Poppins, Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
	weight: '400',
	subsets: ['latin'],
});

const poppins_200 = Poppins({
	weight: '200',
	subsets: ['latin'],
});

const poppins_300 = Poppins({
	weight: '300',
	subsets: ['latin'],
});

const poppins_400 = Poppins({
	weight: '400',
	subsets: ['latin'],
});

const poppins_500 = Poppins({
	weight: '500',
	subsets: ['latin'],
});

const poppins_600 = Poppins({
	weight: '600',
	subsets: ['latin'],
});

const poppins_700 = Poppins({
	weight: '700',
	subsets: ['latin'],
});

const poppins_800 = Poppins({
	weight: '800',
	subsets: ['latin'],
});

const poppins_900 = Poppins({
	weight: '900',
	subsets: ['latin'],
});

const poppinstFont = {
	200: poppins_200,
	300: poppins_300,
	400: poppins_400,
	500: poppins_500,
	600: poppins_600,
	700: poppins_700,
	800: poppins_800,
	900: poppins_900,
};

const font = {
  primary: poppinstFont[400].className,
	primaryName: "Poppins",
	poppins: poppinstFont
};

export default font;
