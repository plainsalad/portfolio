import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { styles } from "../styles";
import { projects } from "../constants";
import { textVariant, fadeIn } from "../utils/motion"; 
import { Tilt } from 'react-tilt';
import { github } from "../assets";


const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img 
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img 
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

const Works = () => {
  const [visibleProjects, setVisibleProjects] = useState(6); // Initial number of projects to display
  const loadMoreRef = useRef(null);

  const handleObserver = (entries) => {
    const target = entries[0];
    console.log("Observer triggered: ", target.isIntersecting); // Debug line
    if (target.isIntersecting) {
      setVisibleProjects((prev) => prev + 6); // Load more projects when the target is in view
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // Clean up observer on unmount
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.slice(0, visibleProjects).map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      {/* Observer element */}
      <div ref={loadMoreRef} style={{ height: '50px', backgroundColor: 'transparent' }}></div>
    </>
  );
};

export default Works;
