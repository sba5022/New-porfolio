import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/project";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetails({
  params,
}: PageProps) {
  const { id } = await params;

  const project = projects.find(
    (project) => project.id === id
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 md:px-12 lg:px-20 py-24">

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link
          href="/viewprojects"
          className="inline-flex items-center gap-2 mb-10 hover:text-accent transition"
        >
          <span className="material-symbols-outlined">
            arrow_back
          </span>

          Back to Projects
        </Link>

        {/* Project Image */}
        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Project Name */}
        <h1 className="text-4xl md:text-6xl font-bold mt-10">
          {project.name}
        </h1>

        {/* Technology */}
        <section className="mt-12">

          <h2 className="text-2xl font-bold">
            Main Technology Stack
          </h2>

          <div className="flex flex-wrap gap-3 mt-5">

            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="px-4 py-2 rounded-full border border-outline-variant"
              >
                {technology}
              </span>
            ))}

          </div>

        </section>

        {/* Description */}
        <section className="mt-12">

          <h2 className="text-2xl font-bold">
            Brief Description
          </h2>

          <p className="mt-4 leading-8 text-on-surface-variant max-w-4xl">
            {project.description}
          </p>

        </section>

        {/* Links */}
        <section className="mt-10 flex gap-4 flex-wrap">

          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-accent text-background rounded-md font-bold"
          >
            Live Project
          </a>

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-outline-variant rounded-md font-bold hover:border-accent transition"
            >
              GitHub Repository
            </a>
          )}

        </section>

        {/* Challenges */}
        <section className="mt-16">

          <h2 className="text-2xl font-bold">
            Challenges Faced
          </h2>

          <ul className="mt-5 space-y-3">

            {project.challenges.map((challenge) => (
              <li
                key={challenge}
                className="text-on-surface-variant"
              >
                → {challenge}
              </li>
            ))}

          </ul>

        </section>

        {/* Improvements */}
        <section className="mt-16 pb-20">

          <h2 className="text-2xl font-bold">
            Potential Improvements & Future Plans
          </h2>

          <ul className="mt-5 space-y-3">

            {project.improvements.map((improvement) => (
              <li
                key={improvement}
                className="text-on-surface-variant"
              >
                → {improvement}
              </li>
            ))}

          </ul>

        </section>

      </div>

    </main>
  );
}