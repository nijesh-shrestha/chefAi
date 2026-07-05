const techStack = [
  'React (Vite)',
  'Tailwind CSS',
  'Express.js',
  'FastAPI',
  'Hugging Face Transformers',
  'OpenAI API',
  'TheMealDB API',
]

function About() {
  return (
    <section>
      <h1 className="font-display text-3xl font-semibold">About SmartChef AI</h1>
      <p className="mt-3 max-w-2xl text-char/70 dark:text-flour/70">
        SmartChef AI helps you find recipes, identify food from a photo using a locally-run
        machine learning model, and get AI-powered cooking guidance.
      </p>

      <h2 className="mt-8 font-display text-xl font-semibold">Built with</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-char/10 px-3 py-1 text-sm dark:border-flour/10"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default About
