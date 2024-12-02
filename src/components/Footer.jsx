import { FaGithub, FaLinkedin } from 'react-icons/fa';

const socialLinks = [
	{ href: 'https://github.com/exslym', icon: <FaGithub /> },
	{ href: 'https://linkedin.com/in/exslym/', icon: <FaLinkedin /> },
];

const Footer = () => {
	return (
		<footer className='w-screen bg-[#5542ff] py-4 text-black'>
			<div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
				<p className='w-max text-center text-lg font-light md:w-[210px] md:text-left'>
					©2024. All rights reserved
				</p>

				<div className='flex w-max justify-center gap-6 md:w-[210px] md:justify-center'>
					{socialLinks.map((link, index) => (
						<a
							key={index}
							href={link.href}
							target='_blank'
							rel='noopener noreferrer'
							className='text-xl text-black transition-colors duration-500 ease-in-out hover:text-white md:text-3xl'
						>
							{link.icon}
						</a>
					))}
				</div>

				<a
					href='#privacy-policy'
					className='w-max text-center text-lg font-light hover:underline md:w-[210px] md:text-right'
				>
					Privacy Policy
				</a>
			</div>
		</footer>
	);
};

export default Footer;
