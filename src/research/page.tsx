"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Search,
  Rocket,
  DrillIcon as Drone,
  Satellite,
  ThumbsUp,
  MessageSquare,
  Share2,
  Download,
  Filter,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Research article data
const researchArticles = [
  {
    id: 1,
    title: "Quantum Navigation Systems for Interplanetary Travel",
    excerpt:
      "A groundbreaking approach to spacecraft navigation using quantum entanglement for precise positioning across vast distances.",
    author: "Dr. Elara Vega",
    date: "March 15, 2023",
    category: "spacecraft",
    image: "/placeholder.svg?height=300&width=500",
    likes: 124,
    comments: 32,
    content: `
      <h2>Abstract</h2>
      <p>This paper presents a novel approach to interplanetary navigation using quantum entanglement principles. By leveraging quantum states across vast distances, we demonstrate a navigation system with unprecedented accuracy that overcomes the limitations of traditional radio-based navigation methods.</p>
      
      <h2>Introduction</h2>
      <p>Navigation in deep space presents unique challenges due to the vast distances involved and the limitations of traditional radio-based systems. Signal delays, interference, and power constraints all contribute to navigation errors that compound over time and distance.</p>
      
      <p>Quantum navigation offers a promising alternative by utilizing the properties of entangled particles to establish instantaneous correlations across any distance. This paper explores the practical implementation of such a system for spacecraft navigation.</p>
      
      <h2>Methodology</h2>
      <p>Our approach combines quantum entanglement with traditional inertial navigation systems. Entangled particle pairs are generated and distributed between the spacecraft and Earth-based reference stations. By measuring the quantum states of these particles, precise positioning information can be derived without the delays associated with radio transmission.</p>
      
      <h2>Results</h2>
      <p>Laboratory tests and simulations demonstrate positioning accuracy improvements of up to 300% compared to traditional deep space navigation methods. The system is particularly effective for missions beyond Mars orbit, where traditional navigation methods face significant challenges.</p>
      
      <h2>Conclusion</h2>
      <p>Quantum navigation represents a paradigm shift in spacecraft positioning technology. While significant engineering challenges remain in creating robust quantum systems for spaceflight, the potential benefits for deep space exploration are substantial.</p>
    `,
  },
  {
    id: 2,
    title: "Biomimetic Drone Designs for Atmospheric Sampling",
    excerpt:
      "Exploring how drone designs inspired by birds and insects can improve atmospheric data collection in extreme environments.",
    author: "Prof. Kai Zhang",
    date: "January 22, 2023",
    category: "drones",
    image: "/placeholder.svg?height=300&width=500",
    likes: 98,
    comments: 24,
    content: `
      <h2>Abstract</h2>
      <p>This research explores biomimetic approaches to drone design for atmospheric sampling in extreme environments. By mimicking the flight mechanics of birds and insects, we have developed drones capable of efficient operation in high winds, turbulence, and varying atmospheric densities.</p>
      
      <h2>Introduction</h2>
      <p>Atmospheric sampling provides crucial data for climate research, pollution monitoring, and weather prediction. However, traditional fixed-wing and multirotor drones face significant challenges in turbulent conditions, limiting their effectiveness in many scenarios.</p>
      
      <h2>Biomimetic Design Principles</h2>
      <p>Our designs incorporate several key features observed in natural flyers:</p>
      <ul>
        <li>Flexible wing structures that adapt to air pressure changes</li>
        <li>Feather-inspired surface features that reduce turbulence</li>
        <li>Insect-inspired stabilization mechanisms for hovering in gusts</li>
      </ul>
      
      <h2>Prototype Performance</h2>
      <p>Field tests in various atmospheric conditions demonstrate significant improvements in flight stability, energy efficiency, and data collection reliability compared to conventional designs.</p>
      
      <h2>Applications</h2>
      <p>These biomimetic drones are particularly well-suited for:</p>
      <ul>
        <li>Sampling in storm systems</li>
        <li>Volcanic plume analysis</li>
        <li>High-altitude atmospheric research</li>
        <li>Urban pollution monitoring in complex wind environments</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Biomimetic approaches offer significant advantages for specialized atmospheric sampling applications. Further research will focus on miniaturization and sensor integration for these novel platforms.</p>
    `,
  },
  {
    id: 3,
    title: "Self-Healing Materials for Orbital Debris Protection",
    excerpt:
      "Development of advanced materials that can automatically repair damage from micrometeoroid impacts on satellites and spacecraft.",
    author: "Dr. Aiden Mercer",
    date: "February 8, 2023",
    category: "satellites",
    image: "/placeholder.svg?height=300&width=500",
    likes: 156,
    comments: 41,
    content: `
      <h2>Abstract</h2>
      <p>This paper presents a novel class of self-healing composite materials designed to mitigate damage from micrometeoroid and orbital debris impacts on spacecraft. These materials combine rigid structural properties with the ability to autonomously seal punctures and prevent catastrophic pressure loss.</p>
      
      <h2>Introduction</h2>
      <p>Orbital debris and micrometeoroid impacts pose significant threats to spacecraft integrity. Even small particles can cause critical damage due to their extreme velocities. Traditional protection methods rely on shields and redundant systems, adding weight and complexity.</p>
      
      <h2>Material Composition</h2>
      <p>Our self-healing composite consists of three primary components:</p>
      <ul>
        <li>A rigid carbon-fiber reinforced outer layer</li>
        <li>An intermediate layer containing microencapsulated healing agents</li>
        <li>A flexible inner liner with embedded catalyst particles</li>
      </ul>
      
      <h2>Healing Mechanism</h2>
      <p>Upon impact, the microcapsules rupture and release a fast-curing polymer that flows into the damaged area. The catalyst initiates rapid polymerization, sealing the breach within seconds. This process can handle punctures up to 2cm in diameter.</p>
      
      <h2>Testing Results</h2>
      <p>Hypervelocity impact tests demonstrate successful healing of punctures from simulated debris impacts at speeds up to 15 km/s. Vacuum chamber tests confirm the material's ability to maintain pressure integrity after healing.</p>
      
      <h2>Conclusion</h2>
      <p>Self-healing materials offer a promising approach to spacecraft protection that reduces weight while improving survivability. Future work will focus on radiation resistance and long-term stability in the space environment.</p>
    `,
  },
  {
    id: 4,
    title: "Neural Networks for Real-Time Spacecraft Anomaly Detection",
    excerpt:
      "Implementation of deep learning algorithms to identify and respond to spacecraft system anomalies without human intervention.",
    author: "Dr. Maya Rodriguez",
    date: "April 3, 2023",
    category: "spacecraft",
    image: "/placeholder.svg?height=300&width=500",
    likes: 112,
    comments: 28,
    content: "Full research content here...",
  },
  {
    id: 5,
    title: "Swarm Intelligence in Drone Formation Control",
    excerpt:
      "Applying biological swarm behaviors to coordinate large numbers of drones for complex atmospheric sampling missions.",
    author: "Prof. Kai Zhang",
    date: "May 17, 2023",
    category: "drones",
    image: "/placeholder.svg?height=300&width=500",
    likes: 87,
    comments: 19,
    content: "Full research content here...",
  },
  {
    id: 6,
    title: "Miniaturized Fusion Propulsion for CubeSats",
    excerpt:
      "Theoretical framework for scaling down fusion propulsion technology for use in small satellite platforms.",
    author: "Dr. Soren Patel",
    date: "June 22, 2023",
    category: "satellites",
    image: "/placeholder.svg?height=300&width=500",
    likes: 134,
    comments: 36,
    content: "Full research content here...",
  },
]

// Category data
const categories = [
  { id: "all", name: "All Research", icon: <Search className="h-4 w-4" /> },
  { id: "spacecraft", name: "Spacecraft", icon: <Rocket className="h-4 w-4" /> },
  { id: "drones", name: "Drones", icon: <Drone className="h-4 w-4" /> },
  { id: "satellites", name: "Satellites", icon: <Satellite className="h-4 w-4" /> },
]

export default function ResearchPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)

  const researchRef = useRef<HTMLDivElement>(null)
  const isResearchInView = useInView(researchRef, { once: true, margin: "-100px" })

  // Filter and search articles
  const filteredArticles = researchArticles.filter(
    (article) =>
      (activeFilter === "all" || article.category === activeFilter) &&
      (searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 space-dots"></div>
        <div className="absolute inset-0 z-0 cosmic-bg"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-space mb-6 glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Research <span className="cosmic-gradient">Hub</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Explore our latest publications and breakthrough discoveries in aerospace technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/research/create">
                <Button size="lg" className="rounded-full">
                  Publish Research <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Research Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-12 max-w-3xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search research articles..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>

                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeFilter === category.id ? "default" : "outline"}
                    size="sm"
                    className="rounded-full shrink-0"
                    onClick={() => setActiveFilter(category.id)}
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Research Articles Grid */}
          <motion.div
            ref={researchRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={isResearchInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isResearchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedArticle(article.id)}
                >
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {categories.find((c) => c.id === article.category)?.name || article.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.author}</span>
                    </div>

                    <h3 className="text-xl font-bold font-space mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{article.likes}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{article.comments}</span>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" className="text-primary">
                        Read More
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No research articles found matching your criteria.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Article Detail Dialog */}
      <Dialog open={selectedArticle !== null} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedArticle && researchArticles.find((a) => a.id === selectedArticle) && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold font-space">
                  {researchArticles.find((a) => a.id === selectedArticle)?.title}
                </DialogTitle>
                <DialogDescription className="flex items-center text-sm text-muted-foreground">
                  <span>{researchArticles.find((a) => a.id === selectedArticle)?.date}</span>
                  <span className="mx-2">•</span>
                  <span>{researchArticles.find((a) => a.id === selectedArticle)?.author}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="relative h-64 sm:h-80 my-4">
                <Image
                  src={researchArticles.find((a) => a.id === selectedArticle)?.image || ""}
                  alt={researchArticles.find((a) => a.id === selectedArticle)?.title || ""}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: researchArticles.find((a) => a.id === selectedArticle)?.content || "",
                }}
              />

              <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like ({researchArticles.find((a) => a.id === selectedArticle)?.likes})
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comment ({researchArticles.find((a) => a.id === selectedArticle)?.comments})
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <div className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-6">
              Share Your <span className="cosmic-gradient">Research</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8">
              Contribute to the advancement of aerospace technology by publishing your research on our platform.
            </p>

            <Link href="/research/create">
              <Button size="lg" className="rounded-full">
                Publish Research <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
