"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react"

const experiences = [
	{
		title: "NEP Saarthi Representative",
		company: "Chitkara University",
		location: "Punjab",
		period: "2024 - 2026",
		description:
			"Selected as the NEP Saarthi representative for the CSE department at Chitkara University, representing the university at the national level. Working to promote the objectives of the National Education Policy (NEP) and contributing to bridging the gap between policy and implementation. Responsibilities include fostering peer engagement, coordinating with faculty, and driving awareness and advocacy initiatives in alignment with NEP goals.",
		type: "work",
	},
	{
		title: "B.E. in Computer Science Engineering",
		company: "Chitkara University",
		location: "Punjab",
		period: "2023 - 2027",
		description:
			"Currently pursuing B.E. in Computer Science Engineering, elected as the Class Representative for three consecutive years and now in 5th semester. Maintaining academic excellence with a CGPA consistently above 9. Participated in and won multiple hackathons, strengthening problem-solving and collaborative development skills, while staying deeply involved in community and innovation-focused campus initiatives.",
		type: "education",
	},
	{
		title: "High School Education",
		company: "Vivek High School",
		location: "Chandigarh",
		period: "2011 - 2023",
		description:
			"Actively engaged in leadership and co-curricular roles. Served as the IT Head for the school's Model United Nations (MUN) team and contributed to several MUN victories. Captained the school chess team and consistently participated in academic and strategic competitions. Focused on the PCM stream, which laid a strong foundation for the technical journey ahead.",
		type: "education",
	},
]

export default function Experience() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	}

	return (
		<section id="experience" className="py-20">
			<div className="container px-4 mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						My Experience
					</h2>
					<div className="w-20 h-1 bg-primary mx-auto mb-10"></div>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						My educational journey and leadership roles that have shaped my
						skills and expertise.
					</p>
				</div>

				<motion.div
					ref={ref}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					className="max-w-4xl mx-auto relative"
				>
					{/* Timeline line */}
					<div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

					{experiences.map((exp, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							className={`relative mb-12 md:mb-16 ${
								index % 2 === 0
									? "md:pr-12 md:text-right md:ml-auto md:mr-auto md:pl-0"
									: "md:pl-12 md:ml-auto md:mr-auto md:pr-0"
							} md:w-1/2`}
						>
							{/* Timeline dot */}
							<div
								className={`absolute top-0 ${
									index % 2 === 0
										? "left-0 md:left-auto md:right-0 md:-mr-3.5"
										: "left-0 md:-ml-3.5"
								} w-7 h-7 rounded-full border-4 border-background ${
									exp.type === "work" ? "bg-primary" : "bg-secondary"
								} z-10`}
							>
								{exp.type === "work" ? (
									<Briefcase className="w-3 h-3 text-primary-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
								) : (
									<GraduationCap className="w-3 h-3 text-secondary-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
								)}
							</div>

							{/* Content */}
							<div
								className={`pl-10 md:pl-0 ${
									index % 2 === 0 ? "md:pr-10" : "md:pl-10"
								}`}
							>
								<div className="bg-card border border-border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
									<h3 className="text-xl font-bold">{exp.title}</h3>
									<h4 className="text-lg text-primary mb-2">
										{exp.company}
									</h4>

									<div className="flex flex-wrap gap-4 mb-3 text-sm text-muted-foreground">
										<div className="flex items-center">
											<MapPin className="w-4 h-4 mr-1" />
											{exp.location}
										</div>
										<div className="flex items-center">
											<Calendar className="w-4 h-4 mr-1" />
											{exp.period}
										</div>
									</div>

									<p className="text-muted-foreground">
										{exp.description}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}

