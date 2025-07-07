"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Testimonial data
const testimonialData = [
	{
		id: 1,
		name: "Sarah Johnson",
		role: "Product Manager at TechCorp",
		image: "/testimonials/person1.jpg",
		content:
			"Working with Rudra was an absolute pleasure. Their technical expertise and ability to translate complex requirements into elegant solutions greatly impressed our team.",
	},
	{
		id: 2,
		name: "Michael Chen",
		role: "CTO at StartupX",
		image: "/testimonials/person2.jpg",
		content:
			"Rudra is one of the most talented developers I've worked with. Their attention to detail and problem-solving skills are exceptional.",
	},
	{
		id: 3,
		name: "Emily Rodriguez",
		role: "Creative Director at DesignHub",
		image: "/testimonials/person3.jpg",
		content:
			"I was blown away by Rudra's ability to transform our design vision into a flawless, responsive website.",
	},
	{
		id: 4,
		name: "David Patel",
		role: "Founder at InnovateCo",
		image: "/testimonials/person4.jpg",
		content:
			"Rudra brought both technical expertise and creative thinking to our challenging project.",
	},
]

export default function Testimonials() {
	// State to manage current testimonial index and autoplay status
	const [currentIndex, setCurrentIndex] = useState(0)
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})

	// Navigate to the next testimonial
	const nextTestimonial = () => {
		setCurrentIndex((prev) => (prev + 1) % testimonialData.length)
	}

	// Navigate to the previous testimonial
	const prevTestimonial = () => {
		setCurrentIndex(
			(prev) => (prev - 1 + testimonialData.length) % testimonialData.length
		)
	}

	return (
		<section id="testimonials" className="py-20 bg-muted/30">
			<div className="container px-4 mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Client Testimonials
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						What people are saying about my work and collaboration experience.
					</p>
					<div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
				</div>

				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					className="max-w-2xl mx-auto"
				>
					<Card className="bg-card border border-border">
						<CardContent className="p-6">
							<div className="text-center mb-6">
								<Avatar className="h-16 w-16 mx-auto mb-4 ring-2 ring-primary/20">
									<AvatarImage
										src={testimonialData[currentIndex].image}
										alt={testimonialData[currentIndex].name}
									/>
									<AvatarFallback>
										{testimonialData[currentIndex].name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<p className="text-lg mb-6">
									"{testimonialData[currentIndex].content}"
								</p>
								<p className="font-medium">
									{testimonialData[currentIndex].name}
								</p>
								<p className="text-sm text-muted-foreground">
									{testimonialData[currentIndex].role}
								</p>
							</div>

							<div className="flex justify-center gap-4 mt-6">
								<Button
									variant="outline"
									size="sm"
									onClick={prevTestimonial}
								>
									<ChevronLeft className="mr-1 h-4 w-4" /> Previous
								</Button>

								<Button
									variant="outline"
									size="sm"
									onClick={nextTestimonial}
								>
									Next{" "}
									<ChevronRight className="ml-1 h-4 w-4" />
								</Button>
							</div>

							<div className="flex justify-center gap-1 mt-4">
								{testimonialData.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentIndex(index)}
										className={`w-2 h-2 rounded-full ${
											index === currentIndex
												? "bg-primary"
												: "bg-muted-foreground/30"
										}`}
										aria-label={`Go to testimonial ${index + 1}`}
									/>
								))}
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	)
}

