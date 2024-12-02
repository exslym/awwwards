import gsap from 'gsap';
import { useRef } from 'react';

import AnimatedTitle from './AnimatedTitle';
import Button from './Button';

const FloatingImage = () => {
	const frameRef = useRef(null);

	const handleMouseMove = e => {
		const { clientX, clientY } = e;
		const element = frameRef.current;

		if (!element) return;

		const rect = element.getBoundingClientRect();
		const xPos = clientX - rect.left;
		const yPos = clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((yPos - centerY) / centerY) * -7;
		const rotateY = ((xPos - centerX) / centerX) * 7;

		gsap.to(element, {
			duration: 0.3,
			rotateX,
			rotateY,
			transformPerspective: 500,
			ease: 'power1.inOut',
		});
	};

	const handleMouseLeave = () => {
		const element = frameRef.current;

		if (element) {
			gsap.to(element, {
				duration: 0.3,
				rotateX: 0,
				rotateY: 0,
				ease: 'power1.inOut',
			});
		}
	};

	return (
		<div id='story' className='min-h-dvh w-screen overflow-hidden bg-black text-blue-50'>
			<div className='flex size-full flex-col items-center py-10 pb-24'>
				<p className='font-general text-[20px] uppercase md:text-3xl'>the multiversal ip world</p>

				<div className='relative size-full'>
					<AnimatedTitle
						title='the st<b>o</b>ry of <br /> a hidden real<b>m</b>'
						containerClass='mt-8 pointer-events-none mix-blend-difference relative z-10'
					/>

					<div className='story-img-container mt-5'>
						<div className='story-img-mask'>
							<div className='story-img-content'>
								<img
									ref={frameRef}
									onMouseMove={handleMouseMove}
									onMouseLeave={handleMouseLeave}
									onMouseUp={handleMouseLeave}
									onMouseEnter={handleMouseLeave}
									src='/img/entrance.webp'
									alt='entrance.webp'
									className='object-contain'
								/>
							</div>
						</div>

						{/* for the rounded corner */}
						<svg className='invisible absolute size-0' xmlns='http://www.w3.org/2000/svg'>
							<defs>
								<filter id='flt_tag'>
									<feGaussianBlur in='SourceGraphic' stdDeviation='8' result='blur' />
									<feColorMatrix
										in='blur'
										mode='matrix'
										values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -9'
										result='flt_tag'
									/>
									<feComposite in='SourceGraphic' in2='flt_tag' operator='atop' />
								</filter>
							</defs>
						</svg>
					</div>
				</div>

				<div className='-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end'>
					<div className='flex h-full w-fit flex-col items-center md:items-start'>
						<p className='mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start'>
							Where realms converge, lies Zentry and the boundless pillar. Discover its secrets and
							shape your fate amidst infinite opportunities.
						</p>

						<Button id='realm-btn' title='discover prologue' containerClass='mt-5' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default FloatingImage;