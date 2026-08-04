const coreFeatures = [
  "Instant notice delivery for school-wide updates and announcements.",
  "Targeted communication for categories, sections, clubs, and specific audiences.",
  "Article publishing so students can share longer-form reporting and writing.",
  "Searchable content archives so notices and stories remain accessible over time.",
  "Calendar-aware event publishing to keep the community aligned on schedules.",
  "Newsletter and outreach hooks for readers who are outside the school network.",
];

const architecture = [
  {
    title: "apps/web",
    body: "The public-facing Next.js application that renders the homepage, article routes, category views, event data, and user actions.",
  },
  {
    title: "apps/studio",
    body: "The Sanity Studio used by editors and moderators to manage content, structure documents, and publish updates.",
  },
  {
    title: "packages/sanity-config",
    body: "The shared Sanity schema package that keeps content types, settings, and editorial structure reusable across the workspace.",
  },
];

const projectValues = [
  "Student-led development with practical ownership of the platform.",
  "Clear, reliable communication for the school community.",
  "Expression of unique and original ideas from our community.",
  "Becoming the front face news platform of our school.",
];

export default function Page() {
  return (
    <article className="min-h-screen px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      <div className="w-full max-w-3xl">
        <div className="font-heading text-3xl uppercase underline decoration-1 decoration-muted underline-offset-4 sm:text-4xl lg:text-5xl">
          About Parewa
        </div>
        <div className="mt-6 font-secondary text-base leading-relaxed text-foreground/70 sm:mt-4 sm:text-xl">
          Parewa is a student-led publishing platform built for showcasing news, articles, and student writing at Budhanilkantha School. Our mission is to connect students, alumni, and associates of Budhanilkantha School with original and impactful journalism.
        </div>

        <div className="mt-6 flex flex-col gap-8 ">
          <section>
            <h2 className="font-heading text-xl uppercase sm:text-2xl lg:text-3xl">Why It Exists</h2>
            <div className="mt-3 space-y-4 font-serif text-base leading-relaxed text-foreground sm:mt-4 sm:space-y-5 sm:text-lg sm:leading-loose">
              <p>
                The original idea behind Parewa was to create a digital system for sending and receiving student notices across the school, replacing the paper-based notice system with the initiative launched by the 6000E batch in 2024.
              </p>
              <p>
                Now, the project has evolved into a platform for bringing together current students, alumni, and associates of BNKS. We showcase top tier work from some of the brightest minds of our school for the world to see.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase sm:text-2xl lg:text-3xl">Project Values</h2>
            <ul className="mt-3 space-y-2 pl-5 font-serif text-base leading-relaxed text-foreground marker:text-primary list-disc sm:mt-4 sm:space-y-3 sm:pl-6 sm:text-lg sm:leading-loose">
              {projectValues.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase sm:text-2xl lg:text-3xl">Project Notes</h2>
            <div className="mt-3 space-y-4 font-serif text-base leading-relaxed text-foreground sm:mt-4 sm:space-y-5 sm:text-lg sm:leading-loose">
              <p>
                Parewa is more than a landing page for notices. It is an attempt to formalize how school information
                is published: who writes it, how it is categorized, how long it stays useful, and how readers return
                to it later. That is why this project combines editorial tooling, structured content models, and a
                public site in a single workspace.
              </p>
              <p>
                The repository also reflects the collaborative nature of the project. There is room for frontend
                work, schema design, content operations, and integration work, which makes it a practical learning
                surface for contributors while still serving a real operational need.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl uppercase sm:text-2xl lg:text-3xl">Contact And Contribution</h2>
            <div className="mt-3 space-y-4 font-serif text-base leading-relaxed text-foreground sm:mt-4 sm:space-y-5 sm:text-lg sm:leading-loose">
              <p>
                Feedback, fixes, and contributions are part of how the platform improves. If you want to contribute,
                open a pull request against the repository and keep changes aligned with the existing code
                conventions.
              </p>
              <p>
                For moderation or project-related issues, contact{" "}
                <a href="mailto:parewa@bnks.edu.np" className="font-medium underline underline-offset-4">
                  parewa@bnks.edu.np
                </a>
                .
              </p>
              <p>
                Tutorials and walkthroughs for the broader project are also available on{" "}
                <a
                  href="https://www.youtube.com/@parewa_bnks"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  the Parewa YouTube channel
                </a>
                . The public project history is available on{" "}
                <a
                  href="https://github.com/budhanilkanthaschool/parewa"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}