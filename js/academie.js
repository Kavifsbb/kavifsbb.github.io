
  // Count-up on view + décalage AOS
  (function(){
    // léger offset si data-delay est présent
    document.querySelectorAll('.kpi-card[data-delay]').forEach(el=>{
      const d = parseInt(el.getAttribute('data-delay')||'0',10);
      el.setAttribute('data-aos-delay', d);
    });

    const counters = document.querySelectorAll('.kpi-card .count');
    if(!counters.length) return;

    const ease = t => 1 - Math.pow(1 - t, 3);
    const animateCount = (el, to) => {
      const start = 0;
      const dur = 1100;
      let st;
      const step = ts => {
        if(!st) st = ts;
        const p = Math.min(1, (ts - st) / dur);
        const val = Math.floor(start + (to - start) * ease(p));
        el.textContent = val.toString();
        if(p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const card = entry.target;
          // déclenche le compteur une fois
          card.querySelectorAll('.count').forEach(c=>{
            if(c.dataset.done) return;
            c.dataset.done = '1';
            animateCount(c, parseInt(c.dataset.target,10));
          });
          // anime aussi l’anneau (force recalc)
          card.querySelectorAll('.kpi-value').forEach(v=>{
            const pct = getComputedStyle(v).getPropertyValue('--pct').trim();
            v.style.strokeDashoffset = `calc(327 - (${pct} * 3.27))`;
          });
          io.unobserve(card);
        }
      });
    }, { threshold: .45 });

    document.querySelectorAll('.kpi-card').forEach(card=> io.observe(card));
  })();

