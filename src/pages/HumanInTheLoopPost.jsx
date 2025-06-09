import React from 'react';
import { motion } from 'motion/react';
import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';

const HumanInTheLoopPost = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavMenu />
      <motion.main
        style={{ background: "#fffff8" }}
        className="max-w-3xl mt-20 mx-auto flex flex-col items-left justify-start min-h-[70vh] mb-24 px-4 sm:px-6 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-4xl text-black mb-8">Human in the Loop</h1>
        <p className="text-[#374151] mb-4">
          The self-aware researcher is an ongoing project with the goal of creating a blog that publishes content mainly crafted by AI and supervised by human. The idea of artificial intelligence boosting human endeavors is paramount right now in the interconnected spaces, and it is a consequence of imagination and vision of people trying to elevate the human species. In the case of the "Human in the loop" blog, the Self-aware researcher is an effort at Agentic AI implementation leveraging the popular open source n8n platform. This is a workflow managing solution that allows to automate powerful logics for different types of end results.
        </p>
        <p className="text-[#374151] mb-4">
          The concept of Human in the loop is that of trying to empower scientific communication by leveraging the synthesizing, analytic capabilities of LLMs: the Agent and the workflow produce high quality draft posts by analyzing carefully selected scientific publication (at the moment the selection process is human made). Then the result is audited by an expert Auditor of AI produced content. Leveraging my role as Senior Auditor for Scale AI, I'm the Human in the loop in this case, ensuring that the quality standards and safety regulations are followed and enforced with the last step of the process, which is the most crucial part, but at the same time the heavy lifting has already been completed by the agentic workflow.
        </p>
        <p className="text-[#374151] mb-4">
          Eventually the Self-aware researcher aims to parallel the weekly improvement of LLMs and of the field of artificial intelligence. On the roadmap there are a lot of listed future implementations to empower the workflow into be able to also select autonomously the avenues of research based on what would be an interesting aspect to develop further based on previously human-certified submission. Keeping a track of topics, sub-topics and the current on-going research that is being published. The self-aware researcher is a workflow that is running and adapting with contextual memory to its own work and human feedback so it can be fine tuned to produce quality, unpolluted, human certified information that could dampen the production of garbage that at the moment is a plague for the internet.
        </p>
        <p className="text-[#374151] mb-4">This is the vision for the SAR (Self-aware researcher):</p>
        <ol className="list-decimal list-inside text-[#374151] mb-4">
          <li>Being able to produce high quality blog-posts adhering to specific compliancy rules;</li>
          <li>Being able to proof-read its own content and adjusting it accordingly;</li>
          <li>Being able to take feedback from the human in the loop and update its own rules, such as compliancy and proof-read;</li>
          <li>Being able to autonomously choose metedata annotation for articles;</li>
          <li>Being able to request for articles and potentially interesting topics to develop;</li>
          <li>Eventually being able to develop an entire editorial plan;</li>
          <li>Naming, designing and ideating potentially future projects such as more complex publications (short reviews, books);</li>
        </ol>
        <p className="text-[#374151] mb-4">
          One thing that the SAR will never do is to be accountable for the content produced and the decisions taken. This whole project idea is based on delegating: to a powerful LLM with limited procedural freedom, so that the human in the loop can elevate to a management and auditing role. The SAR is in heavy development, this website and blog is here for experimenting. Steady but slowly the technology will reach a point were the SAR will produce acceptable results and it will become a very powerful workflow in the hands of whoever wishes to publish blogposts on every kind of topic that later can be post edited or audited by the human expert.
        </p>
        <p className="text-[#374151]">Sincerely,<br />A.</p>
      </motion.main>
      <Footer />
    </motion.div>
  );
};

export default HumanInTheLoopPost; 