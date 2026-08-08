"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/project";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen px-6 md:px-12 lg:px-20 py-24"
    >
      <div className="max-w-7xl mx-auto">
  <Link
          href="/#projects"
          className="inline-flex items-center gap-2 mb-10 hover:text-accent transition"
        >
          <span className="material-symbols-outlined">
            arrow_back
          </span>

          Back to Projects
        </Link>
        <div className="mb-14">
          <p className="text-accent uppercase tracking-widest">
            My Work
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mt-3">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low"
            >

              {/* Project Image */}
              <div className="relative h-60">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {project.name}
                </h3>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full border border-outline-variant"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Details Button */}
                <Link
                  href={`/details/${project.id}`}
                  className="inline-flex items-center gap-2 mt-6 border-b border-accent py-2 uppercase tracking-widest font-bold hover:text-accent transition"
                >
                  View More / Details

                  <span className="material-symbols-outlined text-sm">
                    north_east
                  </span>
                </Link>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}