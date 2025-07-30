"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, Rocket, Satellite, DrillIcon as Drone, Zap, Users, Globe, ChevronDown, Star } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const [communityResearch, setCommunityResearch] = useState<any[]>([])
  const [showFeaturedBadge, setShowFeaturedBadge] = useState(false)

  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })

  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const featuresRef = useRef<HTMLDivElement>(null)
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" })

  const statsRef = useRef<HTMLDivElement>(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })

  const ctaRef = useRef<HTMLDivElement>(null)
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  const researchRef = useRef<HTMLDivElement>(null)
  const isResearchInView = useInView(researchRef, { once: true, margin: "-100px" })

  useEffect(() => {
    // Load community research from localStorage
    const storedResearch = localStorage.getItem("avasya_research")
    if (storedResearch) {
      setCommunityResearch(JSON.parse(storedResearch))
    }

    // Show featured badge with animation after a delay
    const timer = setTimeout(() => {
      setShowFeaturedBadge(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsNewsletterSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription Successful",
        description: "Thank you for subscribing to our newsletter!",
      })
      setEmail("")
      setIsNewsletterSubmitting(false)
    }, 1500)
  }

  // Countdown timer for mission launch
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set the launch date to 30 days from now
    const launchDate = new Date()
    launchDate.setDate(launchDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0 space-dots" style={{ y: springY, opacity: springOpacity }} />

        <div className="absolute inset-0 z-0 cosmic-bg"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={heroRef}
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-space mb-6 glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              Pioneering the <span className="cosmic-gradient">Future</span> of Aerospace
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Avasya Research Lab is at the forefront of drone technology, spacecraft design, and space innovation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="/research">
                <Button size="lg" className="rounded-full">
                  Explore Research <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-full">
                  Learn About Avasya
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>

      {/* Mission Launch Countdown */}
      <div className="py-12 bg-muted/30 relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-space mb-2">
              Next Mission <span className="cosmic-gradient">Launch</span>
            </h2>
            <p className="text-muted-foreground">Countdown to our next major research mission</p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-2xl w-full">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-2 md:p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="text-2xl md:text-4xl font-bold font-space glow-text">{item.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            ref={featuresRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Cutting-Edge <span className="cosmic-gradient">Research Areas</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our interdisciplinary team works on breakthrough technologies across multiple aerospace domains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Drone className="h-10 w-10 text-primary" />,
                title: "Drone Technology",
                description:
                  "Developing autonomous drone systems for exploration, surveillance, and data collection in extreme environments.",
                image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
              },
              {
                icon: <Rocket className="h-10 w-10 text-primary" />,
                title: "Spacecraft Design",
                description:
                  "Innovating spacecraft architecture with advanced propulsion systems and sustainable materials.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
              },
              {
                icon: <Satellite className="h-10 w-10 text-primary" />,
                title: "Satellite Systems",
                description:
                  "Creating next-generation satellite networks for global communication and Earth observation.",
                image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500&auto=format&fit=crop",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border card-hover grid-animation staggered-animation relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 15px hsl(var(--primary) / 0.4)",
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="mb-4 p-3 bg-muted inline-block rounded-lg"
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold font-space mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <div className="absolute top-0 right-0 w-full h-full -z-10 opacity-10">
                  <Image src={feature.image || "/placeholder.svg"} alt={feature.title} fill className="object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Research Showcase */}
      <div className="py-20 relative" ref={researchRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isResearchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Community <span className="cosmic-gradient">Research</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the latest research contributions from our community members.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityResearch.length > 0
              ? communityResearch.slice(0, 3).map((research, index) => (
                  <motion.div
                    key={index}
                    className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden card-hover relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isResearchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="relative h-48">
                      <Image
                        src={research.image || "/placeholder.svg?height=300&width=500"}
                        alt={research.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {research.category}
                      </div>

                      {/* Featured badge with animation */}
                      <AnimatePresence>
                        {index === 0 && showFeaturedBadge && (
                          <motion.div
                            className="absolute top-3 left-3"
                            initial={{ opacity: 0, scale: 0, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: "spring", damping: 12 }}
                          >
                            <Badge className="bg-secondary text-secondary-foreground flex items-center gap-1 px-2 py-1">
                              <Star className="h-3 w-3" />
                              <span>Featured</span>
                            </Badge>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>{research.author?.charAt(0) || "A"}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{research.author || "Anonymous Researcher"}</span>
                      </div>
                      <h3 className="text-xl font-bold font-space mb-2">{research.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{research.excerpt}</p>
                      <Link href="/research">
                        <Button variant="outline" size="sm" className="w-full">
                          Read Research
                        </Button>
                      </Link>
                    </div>

                    {/* New badge for recently added research */}
                    {index === 0 && (
                      <motion.div
                        className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-bold shadow-lg"
                        initial={{ rotate: -15, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      >
                        NEW
                      </motion.div>
                    )}
                  </motion.div>
                ))
              : // Default research items if no community research is available
                [
                  {
                    title: "Quantum Navigation Systems for Interplanetary Travel",
                    category: "Spacecraft",
                    image:
                      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
                    author: "Dr. Elara Vega",
                    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
                  },
                  {
                    title: "Biomimetic Drone Designs for Atmospheric Sampling",
                    category: "Drones",
                    image:
                      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
                    author: "Prof. Kai Zhang",
                    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
                  },
                  {
                    title: "Self-Healing Materials for Orbital Debris Protection",
                    category: "Satellites",
                    image:
                      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=500&auto=format&fit=crop",
                    author: "Dr. Aiden Mercer",
                    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
                  },
                ].map((research, index) => (
                  <motion.div
                    key={index}
                    className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden card-hover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isResearchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48">
                      <Image
                        src={research.image || "/placeholder.svg"}
                        alt={research.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {research.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={research.avatar || "/placeholder.svg"} alt={research.author} />
                          <AvatarFallback>{research.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{research.author}</span>
                      </div>
                      <h3 className="text-xl font-bold font-space mb-2">{research.title}</h3>
                      <Link href="/research">
                        <Button variant="outline" size="sm" className="w-full">
                          Read Research
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/research">
              <Button variant="outline" size="lg" className="rounded-full">
                View All Research <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Rest of the page content remains the same */}
      {/* ... */}
      {/* Team Showcase */}
      <div className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Meet Our <span className="cosmic-gradient">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The brilliant minds behind Avasya's groundbreaking research.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Dr. Elara Vega",
                role: "Founder & Lead Researcher",
                avatar: "https://randomuser.me/api/portraits/women/1.jpg",
                specialty: "Spacecraft Design",
              },
              {
                name: "Prof. Kai Zhang",
                role: "Chief Technology Officer",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
                specialty: "Drone Technology",
              },
              {
                name: "Dr. Aiden Mercer",
                role: "Head of Materials Research",
                avatar: "https://randomuser.me/api/portraits/men/3.jpg",
                specialty: "Advanced Materials",
              },
              {
                name: "Dr. Lyra Chen",
                role: "Quantum Computing Specialist",
                avatar: "https://randomuser.me/api/portraits/women/4.jpg",
                specialty: "Quantum Navigation",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden card-hover">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <div className="inline-block px-2 py-1 bg-muted text-xs rounded-full mb-2">{member.specialty}</div>
                    <h3 className="text-lg font-bold font-space">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/team">
              <Button variant="outline" size="lg" className="rounded-full">
                View All Team Members <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-background relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {[
              { value: "50+", label: "Research Papers", icon: <Zap className="h-6 w-6 text-primary" /> },
              { value: "25", label: "Team Members", icon: <Users className="h-6 w-6 text-primary" /> },
              { value: "12", label: "Global Partners", icon: <Globe className="h-6 w-6 text-primary" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isStatsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold font-space mb-2 glow-text">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Featured <span className="cosmic-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our ongoing research initiatives and technological breakthroughs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "QuantumNav",
                description:
                  "Developing quantum navigation systems for interplanetary spacecraft with unprecedented accuracy.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
                status: "Active",
              },
              {
                title: "BioDrone Initiative",
                description:
                  "Creating biomimetic drone designs inspired by birds and insects for atmospheric research.",
                image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
                status: "Active",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="relative w-full md:w-2/5 h-48 md:h-auto">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {project.status}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xl font-bold font-space mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                    </div>
                    <Link href="/projects">
                      <Button variant="outline" size="sm" className="w-fit">
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="rounded-full">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              What <span className="cosmic-gradient">They Say</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our partners and collaborators about their experience working with Avasya.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Avasya's quantum navigation research has revolutionized how we approach interplanetary missions. Their team's expertise is unmatched.",
                author: "Dr. Sarah Chen",
                role: "Director of Space Exploration, Global Space Agency",
                avatar: "https://randomuser.me/api/portraits/women/11.jpg",
              },
              {
                quote:
                  "The biomimetic drone designs developed by Avasya have opened up entirely new possibilities for atmospheric research in extreme environments.",
                author: "Prof. James Wilson",
                role: "Head of Environmental Sciences, University of Cambridge",
                avatar: "https://randomuser.me/api/portraits/men/12.jpg",
              },
              {
                quote:
                  "Working with Avasya on self-healing materials has been a game-changer for our satellite protection systems. Truly innovative research.",
                author: "Dr. Maria Rodriguez",
                role: "Chief Engineer, Orbital Systems Inc.",
                avatar: "https://randomuser.me/api/portraits/women/13.jpg",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-4xl text-primary">"</div>
                  <p className="flex-1 italic text-muted-foreground mb-6">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Stay <span className="cosmic-gradient">Updated</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter to receive the latest updates on our research and discoveries.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isNewsletterSubmitting}>
                {isNewsletterSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ctaRef}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 cosmic-bg opacity-30"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
                  Join the <span className="cosmic-gradient">Mission</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Become part of our research community and help shape the future of aerospace technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="rounded-full">
                    Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
