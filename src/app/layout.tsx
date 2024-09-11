'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Roboto } from 'next/font/google'
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import Image from "next/image";
import logo from "../logo.png";
import "../styles/page.css"
import { usePathname, useRouter } from 'next/navigation'

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const path = usePathname();

	return (
		<html lang="en" className={roboto.className}>
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<AppBar position="static">
							<Toolbar variant="regular">
								<Image
									src={logo}
									alt={"logo"}
									width={200}
									height={44}
									style={{ filter: "brightness(0) invert(1)", paddingTop: '7px' }} />
								<Box sx={{ flexGrow: 1, display: { md: 'flex' }, gap: '25px', marginLeft: '40px' }}>
									<Button
										key={'city'}
										className={path.includes("CityEmissions") ? 'active-btn' : ''}
										variant="contained"
										disableElevation
										onClick={() => router.push('CityEmissions')}
										sx={{ my: 2, color: 'white', display: 'block' }}
									>
										City Emissions
									</Button>
									<Button
										key={'year'}
										className={path.includes("YearlyEmissions") ? 'active-btn' : ''}
										variant="contained"
										disableElevation
										onClick={() => router.push('YearlyEmissions')}
										sx={{ my: 2, color: 'white', display: 'block' }}
									>
										Yearly Emissions
									</Button>
									<Button
										key={'fuel'}
										variant="contained"
										disableElevation
										className={path.includes("FuelTypeEmissions") ? 'active-btn' : ''}
										onClick={() => router.push('FuelTypeEmissions')}
										sx={{ my: 2, color: 'white', display: 'block' }}
									>
										Fuel Type Emissions
									</Button>

								</Box>
							</Toolbar>
						</AppBar>
						<div className='graph'>
							{children}
						</div>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
