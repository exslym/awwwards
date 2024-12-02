import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(0);

	const totalVideos = 4;
	const nextVideoRef = useRef(null);

	const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
	// 0 % 4 = 0 => 0 + 1 = 1
	// 1 % 4 = 1 => 1 + 1 = 2
	// 2 % 4 = 2 => 2 + 1 = 3
	// 3 % 4 = 3 => 3 + 1 = 4
	// 4 % 4 = 0 => 0 + 1 = 1

	const handleMiniVideoClick = () => {
		setHasClicked(true);
		setCurrentIndex(upcomingVideoIndex);
	};
	const handleVideoLoad = () => {
		setLoadedVideos(prev => prev + 1);
	};

	useEffect(() => {
		if (loadedVideos === totalVideos - 1) {
			setIsLoading(false);
		}
	}, [loadedVideos]);

	// video loop animation:
	useGSAP(
		() => {
			if (hasClicked) {
				gsap.set('#next-video', { visibility: 'visible' });
				gsap.to('#next-video', {
					transformOrigin: 'center center',
					scale: 1,
					width: '100%',
					height: '100%',
					duration: 1,
					ease: 'power1.inOut',
					onStart: () => nextVideoRef.current.play(),
				});
				gsap.from('#current-video', {
					transformOrigin: 'center center',
					scale: 0,
					duration: 1.5,
					ease: 'power1.inOut',
				});
			}
		},
		{ dependencies: [currentIndex], revertOnUpdate: true },
	);

	// clip-path video-frame on scroll:
	useGSAP(() => {
		gsap.set('#video-frame', {
			clipPath:
				'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)',
			borderRadius: '0% 0% 0% 0%',
		});
		gsap.from('#video-frame', {
			clipPath:
				'polygon(20% 0%, 0% 0%, 0% 55%, 0% 100%, 20% 100%, 50% 100%, 80% 100%, 100% 100%, 100% 53%, 100% 0%, 80% 0%, 49% 0%)',
			borderRadius: '0% 0% 0% 0%',
			ease: 'power1.inOut',
			scrollTrigger: {
				trigger: '#video-frame',
				start: 'center center',
				end: 'bottom center',
				scrub: true,
			},
		});
	});

	const getVideoSource = index => `videos/hero-${index}.mp4`;

	return (
		<div className='relative h-dvh w-screen overflow-x-hidden' id='home'>
			{isLoading && (
				<div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
					<div className='three-body'>
						<div className='three-body__dot' />
						<div className='three-body__dot' />
						<div className='three-body__dot' />
					</div>
				</div>
			)}
			<div
				id='video-frame'
				className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'
			>
				<div>
					<div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
						<div
							onClick={handleMiniVideoClick}
							className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
						>
							<video
								ref={nextVideoRef}
								src={getVideoSource(upcomingVideoIndex)}
								loop
								muted
								onLoadedData={handleVideoLoad}
								id='current-video'
								className='size-64 origin-center scale-150 object-cover object-center'
							/>
						</div>
					</div>

					<video
						ref={nextVideoRef}
						src={getVideoSource(currentIndex)}
						loop
						muted
						onLoadedData={handleVideoLoad}
						id='next-video'
						className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
					/>

					<video
						src={getVideoSource(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
						autoPlay
						loop
						muted
						onLoadedData={handleVideoLoad}
						className='absolute left-0 top-0 size-full object-cover object-center'
					/>
				</div>

				<h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
					G<b>a</b>ming
				</h1>

				<div className='absolute left-0 top-0 z-40 size-full'>
					<div className='mt-24 px-5 sm:px-10'>
						<h1 className='special-font hero-heading text-blue-100'>
							redefi<b>n</b>e
						</h1>

						<p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
							Enter the Metagame Layer <br />
							Unleash the Play Economy
						</p>
						<Button
							id='watch-trailer'
							title='Watch Trailer'
							leftIcon={<TiLocationArrow />}
							containerClass='!bg-yellow-300 flex-center gap-1'
						/>
					</div>
				</div>
			</div>

			<h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
				G<b>a</b>ming
			</h1>
		</div>
	);
};

export default Hero;
