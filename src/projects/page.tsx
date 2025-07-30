"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Rocket,
  DrillIcon as Drone,
  Satellite,
  Calendar,
  Users,
  ExternalLink,
  Search,
  Zap,
  Layers,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Project data
const projects = [
  {
    id: 1,
    title: "QuantumNav",
    description: "Developing quantum navigation systems for interplanetary spacecraft with unprecedented accuracy.",
    category: "spacecraft",
    image: "/placeholder.svg?height=300&width=500",
    status: "Active",
    startDate: "2022",
    teamSize: 12,
    content: `
      <h2>Project Overview</h2>
      <p>QuantumNav is our flagship project focused on developing next-generation navigation systems for deep space missions. By leveraging quantum entanglement principles, we aim to create navigation technology that overcomes the limitations of traditional radio-based systems.</p>
      
      <h2>Key Objectives</h2>
      <ul>
        <li>Develop miniaturized quantum entanglement generators suitable for spacecraft integration</li>
        <li>Create robust quantum state measurement systems that function in the space environment</li>
        <li>Design algorithms that translate quantum measurements into precise positioning data</li>
        <li>Integrate quantum navigation with traditional systems for redundancy and verification</li>
      </ul>
      
      <h2>Current Progress</h2>
      <p>Our team has successfully demonstrated the core technology in laboratory conditions, achieving positioning accuracy improvements of up to 300% compared to traditional methods. We are currently working on miniaturization and radiation hardening for space applications.</p>
      
      <h2>Future Milestones</h2>
      <ul>
        <li>Q3 2023: Complete prototype quantum navigation unit</li>
        <li>Q1 2024: Begin thermal-vacuum testing of prototype</li>
        <li>Q4 2024: Integration with test spacecraft platform</li>
        <li>2025: Proposed technology demonstration mission in Earth orbit</li>
      </ul>
    `,
  },
  {
    id: 2,
    title: "BioDrone Initiative",
    description: "Creating biomimetic drone designs inspired by birds and insects for atmospheric research.",
    category: "drones",
    image: "/placeholder.svg?height=300&width=500",
    status: "Active",
    startDate: "2021",
    teamSize: 8,
    content: `
      <h2>Project Overview</h2>
      <p>The BioDrone Initiative explores how principles from nature can be applied to drone design for improved performance in challenging atmospheric conditions. Our biomimetic approach draws inspiration from birds and insects to create drones that are more efficient, stable, and capable in diverse environments.</p>
      
      <h2>Key Objectives</h2>
      <ul>
        <li>Develop flexible wing structures that adapt to changing air conditions</li>
        <li>Create micro-scale surface features inspired by bird feathers for improved aerodynamics</li>
        <li>Implement insect-inspired stabilization mechanisms for hovering in turbulent conditions</li>
        <li>Design specialized atmospheric sampling systems for these novel platforms</li>
      </ul>
      
      <h2>Current Progress</h2>
      <p>We have successfully developed and tested three prototype designs, each mimicking different natural flyers. Our hummingbird-inspired prototype has demonstrated exceptional stability in wind tunnel tests, maintaining position in simulated gusts up to 35 mph.</p>
      
      <h2>Future Milestones</h2>
      <ul>
        <li>Q4 2023: Field testing of prototypes in various weather conditions</li>
        <li>Q2 2024: Integration of specialized atmospheric sampling equipment</li>
        <li>Q3 2024: Deployment for volcanic plume sampling mission</li>
        <li>2025: Development of miniaturized versions for swarm applications</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: "Self-Healing Materials",
    description: "Developing advanced materials that automatically repair damage from micrometeoroid impacts.",
    category: "materials",
    image: "/placeholder.svg?height=300&width=500",
    status: "Active",
    startDate: "2022",
    teamSize: 6,
    content: `
      <h2>Project Overview</h2>
      <p>The Self-Healing Materials project focuses on creating advanced composite materials that can autonomously repair damage caused by micrometeoroid and orbital debris impacts. These materials are designed to maintain structural integrity and prevent catastrophic pressure loss in spacecraft and habitats.</p>
      
      <h2>Key Objectives</h2>
      <ul>
        <li>Develop multi-layer composite materials with embedded healing agents</li>
        <li>Create fast-curing polymers that function in vacuum and extreme temperatures</li>
        <li>Design systems that can heal punctures up to 2cm in diameter</li>
        <li>Ensure materials maintain their properties after healing events</li>
      </ul>
      
      <h2>Current Progress</h2>
      <p>Our team has successfully developed a three-layer composite that has demonstrated healing capabilities in laboratory vacuum chamber tests. The material can seal punctures up to 1.5cm in diameter within seconds of impact.</p>
      
      <h2>Future Milestones</h2>
      <ul>
        <li>Q4 2023: Complete radiation exposure testing</li>
        <li>Q2 2024: Hypervelocity impact testing at NASA facilities</li>
        <li>Q1 2025: Production of full-scale demonstration panels</li>
        <li>2026: Integration into spacecraft design proposals</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: "MicroFusion Propulsion",
    description: "Researching miniaturized fusion propulsion systems for next-generation spacecraft.",
    category: "propulsion",
    image: "/placeholder.svg?height=300&width=500",
    status: "Research",
    startDate: "2023",
    teamSize: 10,
    content: "Full project content here...",
  },
  {
    id: 5,
    title: "Orbital Debris Mapping",
    description: "Creating high-resolution maps of orbital debris to improve spacecraft safety.",
    category: "satellites",
    image: "/placeholder.svg?height=300&width=500",
    status: "Active",
    startDate: "2021",
    teamSize: 7,
    content: "Full project content here...",
  },
  {
    id: 6,
    title: "Swarm Intelligence Network",
    description: "Developing autonomous drone swarms for complex atmospheric and planetary exploration.",
    category: "drones",
    image: "/placeholder.svg?height=300&width=500",
    status: "Active",
    startDate: "2022",
    teamSize: 9,
    content: "Full project content here...",
  },
]

// Category data
const categories = [
  { id: "all", name: "All Projects", icon: <Search className="h-4 w-4" /> },
  { id: "spacecraft", name: "Spacecraft", icon: <Rocket className="h-4 w-4" /> },
  { id: "drones", name: "Drones", icon: <Drone className="h-4 w-4" /> },
  { id: "satellites", name: "Satellites", icon: <Satellite className="h-4 w-4" /> },
  { id: "propulsion", name: "Propulsion", icon: <Zap className="h-4 w-4" /> },
  { id: "materials", name: "Materials", icon: <Layers className="h-4 w-4" /> },
]

// Status options
const statusOptions = [
  { id: "all", name: "All Status" },
  { id: "active", name: "Active" },
  { id: "completed", name: "Completed" },
  { id: "research", name: "Research Phase" },
]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const projectsRef = useRef<HTMLDivElement>(null)
  const isProjectsInView = useInView(projectsRef, { once: true, margin: "-100px" })

  // Filter projects
  const filteredProjects = projects.filter(
    (project) =>
      (activeFilter === "all" || project.category === activeFilter) &&
      (statusFilter === "all" || project.status.toLowerCase() === statusFilter),
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
              Project <span className="cosmic-gradient">Gallery</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Explore our ongoing and completed research projects in aerospace technology.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-12 max-w-3xl mx-auto">
            <motion.div
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveFilter(category.id)}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-2 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {statusOptions.map((status) => (
                <Button
                  key={status.id}
                  variant={statusFilter === status.id ? "secondary" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setStatusFilter(status.id)}
                >
                  {status.name}
                </Button>
              ))}
            </motion.div>
          </div>

          {/* Projects Grid */}
          <motion.div
            ref={projectsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={isProjectsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isProjectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="relative h-48">
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

                  <div className="p-6">
                    <h3 className="text-xl font-bold font-space mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Started {project.startDate}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{project.teamSize} Researchers</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      View Project Details
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No projects found matching your criteria.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedProject && projects.find((p) => p.id === selectedProject) && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold font-space">
                  {projects.find((p) => p.id === selectedProject)?.title}
                </DialogTitle>
                <DialogDescription className="flex items-center text-sm text-muted-foreground">
                  <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                    {projects.find((p) => p.id === selectedProject)?.status}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="relative h-64 sm:h-80 my-4">
                <Image
                  src={projects.find((p) => p.id === selectedProject)?.image || ""}
                  alt={projects.find((p) => p.id === selectedProject)?.title || ""}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Category</div>
                  <div className="font-medium">
                    {categories.find((c) => c.id === projects.find((p) => p.id === selectedProject)?.category)?.name ||
                      projects.find((p) => p.id === selectedProject)?.category}
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Started</div>
                  <div className="font-medium">{projects.find((p) => p.id === selectedProject)?.startDate}</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Team Size</div>
                  <div className="font-medium">
                    {projects.find((p) => p.id === selectedProject)?.teamSize} Researchers
                  </div>
                </div>
              </div>

              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: projects.find((p) => p.id === selectedProject)?.content || "",
                }}
              />

              <div className="flex justify-end mt-6 pt-6 border-t border-border">
                <Button>
                  Visit Project Website <ExternalLink className="ml-2 h-4 w-4" />
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
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 cosmic-bg opacity-30"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
                  Interested in <span className="cosmic-gradient">Collaboration?</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We're always looking for partners to join our mission of advancing aerospace technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Learn More
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
