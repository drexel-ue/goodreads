const lazyLoad = target => {
  const io = new IntersectionObserver((enteries, observer) => {
    enteries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data_lazy");

        if (src) img.setAttribute("src", src);

        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

export default lazyLoad;
