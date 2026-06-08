function scrollDepotFinderIntoView() {
  var finder = document.getElementById('depot-finder') || document.getElementById('businesskonto-finder');
  if (!finder) return;

  var target = finder.querySelector('.section-header') || finder;
  var nav = document.getElementById('site-nav');
  var navHeight = nav ? nav.getBoundingClientRect().height : 72;
  var breathingRoom = window.matchMedia('(max-width: 700px)').matches ? 18 : 28;
  var targetTop = target.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: Math.max(0, targetTop - navHeight - breathingRoom),
    behavior: 'smooth'
  });
}

(function() {
  var heroFinder = document.querySelector('[data-hero-finder]');
  if (!heroFinder) return;

  var hQ1 = null;
  var hContinueBtn = heroFinder.querySelector('[data-hero-action="continue"]');

  function setHeroProgressSelected() {
    var dot1 = heroFinder.querySelector('[data-hero-step-dot="1"]');
    var dot2 = heroFinder.querySelector('[data-hero-step-dot="2"]');
    var line1 = heroFinder.querySelector('[data-hero-step-line="1"]');
    if (!dot1 || !dot2 || !line1) return;

    dot1.classList.remove('is-active');
    dot1.classList.add('is-done');
    line1.classList.add('is-done');
    dot2.classList.add('is-active');
  }

  function handOffToMainFinder() {
    if (!hQ1) return;

    document.dispatchEvent(new CustomEvent('aktiendepot24:heroFinderSelected', {
      detail: { q1: hQ1 }
    }));

    scrollDepotFinderIntoView();
  }

  heroFinder.addEventListener('click', function(event) {
    var q1Button = event.target.closest('[data-hero-q1]');
    if (q1Button) {
      hQ1 = q1Button.dataset.heroQ1;
      heroFinder.querySelectorAll('[data-hero-q1]').forEach(function(btn) {
        btn.classList.toggle('is-selected', btn === q1Button);
      });
      if (hContinueBtn) hContinueBtn.disabled = false;
      setHeroProgressSelected();
      handOffToMainFinder();
      return;
    }

    var actionButton = event.target.closest('[data-hero-action="continue"]');
    if (actionButton) handOffToMainFinder();
  });
})();

(function() {
  var fQ1 = null;
  var fQ2 = null;
  var fQ1FromHero = false;
  var fLogos = {
    'Depot Vergleich': '../images/mini-logos/trade-republic.svg',
    'Online Broker Vergleich': '../images/mini-logos/scalable-capital.png',
    'ETF Sparplan Vergleich': '../images/mini-logos/scalable-capital.png',
    'Junior Depot': '../images/mini-logos/consorsbank.png',
    'Trade Republic': '../images/mini-logos/trade-republic.svg',
    'Scalable Capital': '../images/mini-logos/scalable-capital.png',
    'comdirect Depot': '../images/mini-logos/comdirect.png',
    'Consorsbank Depot': '../images/mini-logos/consorsbank.png'
  };
  var fQ1Labels = {
    depot: 'Depot Vergleich',
    broker: 'Online Broker',
    etf: 'ETF Sparplan',
    junior: 'Junior Depot'
  };
  var fDB = {
    depot: {
      kosten: [
        { name:'Depot Vergleich', tag:'Kosten, Orderpreise und Depotmodelle vergleichen', pros:['Depotgebühren und Orderkosten einordnen','Neobroker und Direktbanken gegenüberstellen','Passende Anbieter-Reviews direkt erreichen'], price:'Startseite für den Depotvergleich', primary:'/depot-vergleich/', secondary:'/trade-republic/', top:true },
        { name:'Trade Republic', tag:'Neobroker als Kosten- und App-Anker', pros:['App-Fokus und einfache Orderwege','ETF-Sparpläne prüfen','Gut für kostenbewusste Anleger einzuordnen'], price:'Detailtest mit aktuellen Konditionen prüfen', primary:'/trade-republic/', secondary:'/online-broker-vergleich/', top:false }
      ],
      auswahl: [
        { name:'comdirect Depot', tag:'Direktbank-Depot mit breiterem Bankumfeld', pros:['Depot, Bankfunktionen und Service zusammen betrachten','ETF-Sparpläne und Handelsplätze prüfen','Für klassische Direktbank-Nutzung relevant'], price:'Review und Konditionen prüfen', primary:'/comdirect-depot/', secondary:'/depot-vergleich/', top:true },
        { name:'Consorsbank Depot', tag:'Direktbank-Depot für aktive und langfristige Anleger', pros:['Sparpläne, Handelsangebot und Service einordnen','Geeignet als Direktbank-Vergleichsanker','Stärken und Schwächen transparent prüfen'], price:'Review und Konditionen prüfen', primary:'/consorsbank-depot/', secondary:'/depot-vergleich/', top:false }
      ],
      sparplan: [
        { name:'ETF Sparplan Vergleich', tag:'ETF-Sparpläne im Depotvergleich priorisieren', pros:['Ausführungskosten und ETF-Auswahl prüfen','Sparraten und Flexibilität vergleichen','Für langfristigen Vermögensaufbau gedacht'], price:'P0-Vergleich öffnen', primary:'/etf-sparplan-vergleich/', secondary:'/etf-sparplan/', top:true },
        { name:'Scalable Capital', tag:'Broker mit starkem ETF-Sparplan-Fokus', pros:['ETF-Angebot und App einordnen','Kostenmodell vergleichen','Als Review mit Broker-Vergleich verknüpft'], price:'Detailtest mit aktuellen Konditionen prüfen', primary:'/scalable-capital/', secondary:'/online-broker-vergleich/', top:false }
      ],
      service: [
        { name:'comdirect Depot', tag:'Direktbank-Depot mit Service- und Bankanbindung', pros:['Klassische Depotnutzung prüfen','Bankumfeld und Service berücksichtigen','Für langfristige Depotnutzung einordnen'], price:'Review und Konditionen prüfen', primary:'/comdirect-depot/', secondary:'/depot-vergleich/', top:true },
        { name:'Consorsbank Depot', tag:'Direktbank-Alternative mit breitem Depotfokus', pros:['Depotfunktionen und Sparpläne prüfen','Serviceaspekte einordnen','Als Vergleichsanker für Direktbanken geeignet'], price:'Review und Konditionen prüfen', primary:'/consorsbank-depot/', secondary:'/depot-vergleich/', top:false }
      ]
    },
    broker: {
      kosten: [
        { name:'Trade Republic', tag:'Neobroker für kostenbewusste Anleger', pros:['App-Fokus und einfache Bedienung','Orderkosten und Sparplanangebot prüfen','Guter Einstieg in Neobroker-Vergleiche'], price:'Detailtest mit aktuellen Konditionen prüfen', primary:'/trade-republic/', secondary:'/online-broker-vergleich/', top:true },
        { name:'Scalable Capital', tag:'Broker-Plattform mit Tarifmodell', pros:['Kostenmodell und Funktionen vergleichen','ETF-Sparpläne und Handelsangebot einordnen','Alternative zum reinen App-Broker prüfen'], price:'Detailtest mit aktuellen Konditionen prüfen', primary:'/scalable-capital/', secondary:'/online-broker-vergleich/', top:false }
      ],
      auswahl: [
        { name:'Online Broker Vergleich', tag:'Broker nach Handelsverhalten auswählen', pros:['Handelsplätze, App und Webplattform vergleichen','Neobroker und Direktbanken einordnen','Top Reviews miteinander verknüpfen'], price:'P0-Vergleich öffnen', primary:'/online-broker-vergleich/', secondary:'/depot-vergleich/', top:true },
        { name:'Scalable Capital', tag:'Broker und Anlageplattform im Detail', pros:['Wertpapierauswahl prüfen','Sparplanangebot einordnen','Plattform und App vergleichen'], price:'Detailtest mit aktuellen Konditionen prüfen', primary:'/scalable-capital/', secondary:'/trade-republic/', top:false }
      ],
      sparplan: [
        { name:'ETF Sparplan Vergleich', tag:'Broker mit ETF-Sparplan-Fokus finden', pros:['Sparplan-Kosten und ETF-Auswahl prüfen','Ausführung und Flexibilität vergleichen','Für regelmäßiges Investieren relevant'], price:'P0-Vergleich öffnen', primary:'/etf-sparplan-vergleich/', secondary:'/online-broker-vergleich/', top:true },
        { name:'Trade Republic', tag:'Neobroker mit Sparplan-Fokus prüfen', pros:['ETF-Sparpläne im Review einordnen','App und Orderprozess vergleichen','Kosten transparent prüfen'], price:'Detailtest mit aktuellen Konditionen prüfen', primary:'/trade-republic/', secondary:'/scalable-capital/', top:false }
      ],
      service: [
        { name:'Online Broker Vergleich', tag:'Broker nicht nur nach Preis auswählen', pros:['Service, Sicherheit und Plattform berücksichtigen','Direktbanken und Neobroker trennen','Passenden Nutzungstyp finden'], price:'P0-Vergleich öffnen', primary:'/online-broker-vergleich/', secondary:'/depot-vergleich/', top:true },
        { name:'comdirect Depot', tag:'Direktbank-Depot als Service-Alternative', pros:['Bankumfeld und Service einordnen','Depot und Sparpläne prüfen','Alternative zu reinen App-Brokern'], price:'Review und Konditionen prüfen', primary:'/comdirect-depot/', secondary:'/consorsbank-depot/', top:false }
      ]
    },
    etf: {
      kosten: [
        { name:'ETF Sparplan Vergleich', tag:'Sparplan-Kosten und ETF-Auswahl priorisieren', pros:['Ausführungskosten vergleichen','Mindestsparrate und Flexibilität prüfen','ETF-Auswahl nach Anbieter einordnen'], price:'P0-Vergleich öffnen', primary:'/etf-sparplan-vergleich/', secondary:'/etf-sparplan/', top:true },
        { name:'Scalable Capital', tag:'ETF-orientierter Broker-Review', pros:['ETF-Sparpläne und Kostenmodell prüfen','App und Plattform einordnen','Als Anbieter-Test verknüpft'], price:'Detailtest mit aktuellen Konditionen prüfen', primary:'/scalable-capital/', secondary:'/trade-republic/', top:false }
      ],
      auswahl: [
        { name:'ETF Sparplan Vergleich', tag:'ETF-Angebot nach Breite und Flexibilität vergleichen', pros:['ETF-Auswahl und Sparplanfähigkeit prüfen','Ausführungstage und Raten vergleichen','Direktbanken und Broker einordnen'], price:'P0-Vergleich öffnen', primary:'/etf-sparplan-vergleich/', secondary:'/etf/', top:true },
        { name:'comdirect Depot', tag:'Direktbank-Depot mit ETF-Sparplänen prüfen', pros:['ETF-Angebot im Bankdepot betrachten','Service und Depotumfeld berücksichtigen','Für langfristige Anleger einordnen'], price:'Review und Konditionen prüfen', primary:'/comdirect-depot/', secondary:'/consorsbank-depot/', top:false }
      ],
      sparplan: [
        { name:'ETF Sparplan Vergleich', tag:'Direkter Einstieg für regelmäßiges Investieren', pros:['Kosten, ETF-Auswahl und Sparrate vergleichen','Für langfristige Strategien gedacht','Mit Wissensartikeln verknüpft'], price:'P0-Vergleich öffnen', primary:'/etf-sparplan-vergleich/', secondary:'/etf-sparplan/', top:true },
        { name:'Trade Republic', tag:'Neobroker mit ETF-Sparplan-Fokus', pros:['App-Fokus prüfen','Sparplanangebot einordnen','Kosten transparent vergleichen'], price:'Detailtest mit aktuellen Konditionen prüfen', primary:'/trade-republic/', secondary:'/scalable-capital/', top:false }
      ],
      service: [
        { name:'comdirect Depot', tag:'ETF-Sparpläne im Direktbank-Umfeld', pros:['Service und Bankfunktionen berücksichtigen','ETF-Sparpläne prüfen','Langfristige Depotnutzung einordnen'], price:'Review und Konditionen prüfen', primary:'/comdirect-depot/', secondary:'/etf-sparplan-vergleich/', top:true },
        { name:'Consorsbank Depot', tag:'Direktbank-Alternative für ETF-Sparpläne', pros:['Sparpläne und Service vergleichen','Depotfunktionen einordnen','Für klassische Anleger relevant'], price:'Review und Konditionen prüfen', primary:'/consorsbank-depot/', secondary:'/etf-sparplan-vergleich/', top:false }
      ]
    },
    junior: {
      kosten: [
        { name:'Junior Depot', tag:'Depot für Kinder nach Kosten und Praxis vergleichen', pros:['Depotgebühren und Sparplankosten prüfen','Eröffnung und Elternrolle verständlich machen','Langfristige ETF-Nutzung einordnen'], price:'P0-Vergleich öffnen', primary:'/junior-depot/', secondary:'/comdirect-junior-depot/', top:true },
        { name:'Consorsbank Depot', tag:'Direktbank-Anker für Junior-Depot-Recherche', pros:['Junior-Depot-Eignung später vertiefen','Sparplanangebot und Service prüfen','Mit Kinderdepot-Hub verknüpfen'], price:'Review und Konditionen prüfen', primary:'/consorsbank-depot/', secondary:'/junior-depot/', top:false }
      ],
      auswahl: [
        { name:'Junior Depot', tag:'Anbieter und Eröffnungsprozess vergleichen', pros:['Depot für Minderjährige einordnen','ETF-Sparpläne berücksichtigen','Direktbank-Angebote strukturiert prüfen'], price:'P0-Vergleich öffnen', primary:'/junior-depot/', secondary:'/kinderdepot/', top:true },
        { name:'comdirect Depot', tag:'Direktbank-Umfeld für Familien prüfen', pros:['Depotumfeld und Sparpläne betrachten','Service und Verwaltung einordnen','Als P0-Review-Anker verknüpft'], price:'Review und Konditionen prüfen', primary:'/comdirect-depot/', secondary:'/junior-depot/', top:false }
      ],
      sparplan: [
        { name:'Junior Depot', tag:'ETF-Sparpläne für Kinder einordnen', pros:['Langfristige Sparpläne erklären','Kosten und Flexibilität prüfen','Eröffnung und gesetzliche Vertreter berücksichtigen'], price:'P0-Vergleich öffnen', primary:'/junior-depot/', secondary:'/etf-sparplan-vergleich/', top:true },
        { name:'ETF Sparplan Vergleich', tag:'ETF-Sparplan-Grundlage für Junior Depots', pros:['ETF-Auswahl und Kosten vergleichen','Regelmäßige Anlage verstehen','Wissensartikel ergänzen'], price:'P0-Vergleich öffnen', primary:'/etf-sparplan-vergleich/', secondary:'/etf-sparplan/', top:false }
      ],
      service: [
        { name:'Junior Depot', tag:'Eröffnung, Verwaltung und langfristige Nutzung prüfen', pros:['Rollen der Eltern verstehen','Direktbank-Service einordnen','Depot langfristig verwalten'], price:'P0-Vergleich öffnen', primary:'/junior-depot/', secondary:'/comdirect-depot/', top:true },
        { name:'Consorsbank Depot', tag:'Direktbank-Review als Service-Anker', pros:['Service und Depotfunktionen prüfen','Sparplanangebot einordnen','Als Junior-Depot-Kontext nutzen'], price:'Review und Konditionen prüfen', primary:'/consorsbank-depot/', secondary:'/junior-depot/', top:false }
      ]
    }
  };

  function fSelectQ1(val, btn) {
    fQ1 = val;
    document.querySelectorAll('#fstep1 .finder-opt').forEach(function(b) { b.classList.remove('selected'); });
    if (btn) btn.classList.add('selected');
    var next = document.getElementById('fbtn1');
    if (next) next.disabled = false;
    var result = document.getElementById('fresult');
    if (result) result.hidden = true;
  }

  function fUpdateQ1Summary() {
    var prefillNote = document.getElementById('finder-prefill-note');
    if (!prefillNote || !fQ1) return;

    var source = prefillNote.querySelector('[data-finder-prefill-source]');
    var label = prefillNote.querySelector('[data-finder-prefill-label]');
    if (source) source.textContent = fQ1FromHero ? 'Aus der Auswahl oben übernommen' : 'Ausgewählt in Schritt 1';
    if (label) label.textContent = fQ1Labels[fQ1] || 'Ihre Auswahl';
    prefillNote.hidden = false;
  }

  function fSelectQ2(val, btn) {
    fQ2 = val;
    document.querySelectorAll('#fstep2 .finder-opt').forEach(function(b) { b.classList.remove('selected'); });
    if (btn) btn.classList.add('selected');
    var next = document.getElementById('fbtn2');
    if (next) next.disabled = false;
    var result = document.getElementById('fresult');
    if (result) result.hidden = true;
  }

  function fGoStep2() {
    document.getElementById('fstep1').hidden = true;
    var s2 = document.getElementById('fstep2');
    s2.hidden = false;
    document.getElementById('fresult').hidden = true;
    fUpdateQ1Summary();
    document.getElementById('fdot1').className = 'finder-step-dot done';
    document.getElementById('fline1').className = 'finder-step-line done';
    document.getElementById('fdot2').className = 'finder-step-dot active';
    document.getElementById('fline2').className = 'finder-step-line';
    document.getElementById('fdot3').className = 'finder-step-dot pending';
  }

  function fGoStep1() {
    document.getElementById('fstep2').hidden = true;
    document.getElementById('fstep1').hidden = false;
    document.getElementById('fresult').hidden = true;
    var prefillNote = document.getElementById('finder-prefill-note');
    if (prefillNote) prefillNote.hidden = true;
    document.getElementById('fdot1').className = 'finder-step-dot active';
    document.getElementById('fline1').className = 'finder-step-line';
    document.getElementById('fdot2').className = 'finder-step-dot pending';
    document.getElementById('fline2').className = 'finder-step-line';
    document.getElementById('fdot3').className = 'finder-step-dot pending';
  }

  function fShowResult() {
    if (!fQ1 || !fQ2 || !fDB[fQ1] || !fDB[fQ1][fQ2]) return;
    var recs = fDB[fQ1][fQ2];
    document.getElementById('fstep2').hidden = true;
    document.getElementById('fdot2').className = 'finder-step-dot done';
    document.getElementById('fline2').className = 'finder-step-line done';
    document.getElementById('fdot3').className = 'finder-step-dot done';
    var html = '<div class="finder-result-grid">';
    recs.forEach(function(r) {
      var logoSrc = fLogos[r.name] || '';
      var logoHtml = logoSrc
        ? '<img src="' + logoSrc + '" class="finder-result-logo" alt="' + r.name + '">'
        : '<div class="finder-result-logo finder-result-logo-fallback">' + r.name.charAt(0) + '</div>';
      html += '<div class="finder-result-card' + (r.top ? ' is-top' : '') + '">';
      html += '<span class="finder-result-badge ' + (r.top ? 'top' : 'alt') + '">' + (r.top ? 'Passender Einstieg' : 'Alternative') + '</span>';
      html += '<div class="finder-result-header">' + logoHtml + '<div><div class="finder-result-name">' + r.name + '</div><div class="finder-result-tag">' + r.tag + '</div></div></div>';
      html += '<ul class="finder-result-pros">' + r.pros.map(function(p) { return '<li>' + p + '</li>'; }).join('') + '</ul>';
      html += '<div class="finder-result-price">Hinweis: <strong>' + r.price + '</strong></div>';
      html += '<div class="finder-result-trust"><span>Redaktionell geprüft</span><span>Stand: Juni 2026</span><span>Keine Anlageberatung</span></div>';
      html += '<div class="finder-result-links">';
      html += '<a href="' + r.primary + '" class="finder-link-primary">Seite öffnen →</a>';
      html += '<a href="' + r.secondary + '" class="finder-link-secondary">Alternative ansehen</a>';
      html += '</div></div>';
    });
    html += '</div><button class="finder-restart" data-finder-action="restart">← Neu starten</button>';
    var rv = document.getElementById('fresult');
    rv.innerHTML = html;
    rv.hidden = false;
  }

  function fRestart() {
    fQ1 = null;
    fQ2 = null;
    fQ1FromHero = false;
    document.getElementById('fresult').hidden = true;
    document.getElementById('fstep1').hidden = false;
    document.getElementById('fstep2').hidden = true;
    var prefillNote = document.getElementById('finder-prefill-note');
    if (prefillNote) prefillNote.hidden = true;
    document.querySelectorAll('.finder-opt').forEach(function(b) { b.classList.remove('selected'); });
    document.getElementById('fbtn1').disabled = true;
    document.getElementById('fbtn2').disabled = true;
    document.getElementById('fdot1').className = 'finder-step-dot active';
    document.getElementById('fdot2').className = 'finder-step-dot pending';
    document.getElementById('fdot3').className = 'finder-step-dot pending';
    document.getElementById('fline1').className = 'finder-step-line';
    document.getElementById('fline2').className = 'finder-step-line';
  }

  function initFinderControls() {
    var finder = document.querySelector('.section-finder');
    if (!finder) return;

    finder.addEventListener('click', function(event) {
      var q1Button = event.target.closest('[data-finder-q1]');
      if (q1Button) {
        fQ1FromHero = false;
        fSelectQ1(q1Button.dataset.finderQ1, q1Button);
        var prefillNote = document.getElementById('finder-prefill-note');
        if (prefillNote) prefillNote.hidden = true;
        return;
      }

      var q2Button = event.target.closest('[data-finder-q2]');
      if (q2Button) {
        fSelectQ2(q2Button.dataset.finderQ2, q2Button);
        return;
      }

      var actionButton = event.target.closest('[data-finder-action]');
      if (!actionButton) return;

      if (actionButton.dataset.finderAction === 'next') fGoStep2();
      if (actionButton.dataset.finderAction === 'back') fGoStep1();
      if (actionButton.dataset.finderAction === 'result') fShowResult();
      if (actionButton.dataset.finderAction === 'restart') fRestart();
    });

    document.addEventListener('aktiendepot24:heroFinderSelected', function(event) {
      var q1 = event.detail && event.detail.q1;
      if (!q1) return;

      var q1Button = finder.querySelector('[data-finder-q1="' + q1 + '"]');
      if (!q1Button) return;

      fSelectQ1(q1, q1Button);
      fQ1FromHero = true;
      fQ2 = null;
      finder.querySelectorAll('#fstep2 .finder-opt').forEach(function(btn) {
        btn.classList.remove('selected');
      });
      document.getElementById('fbtn2').disabled = true;
      fGoStep2();
    });

    document.addEventListener('click', function(event) {
      var scrollLink = event.target.closest('[data-scroll-to-finder]');
      if (!scrollLink) return;
      event.preventDefault();
      scrollDepotFinderIntoView();
    });
  }

  initFinderControls();
})();

(() => {
  function toggleFaq(btn) {
    const item = btn.closest(".faq-item");
    if (!item) return;

    const answer = item.querySelector(".faq-a");
    if (!answer) return;

    const isOpen = item.classList.contains("open");

    const setFaqState = (faqItem, open) => {
      const faqButton = faqItem.querySelector(".faq-q");
      const faqAnswer = faqItem.querySelector(".faq-a");
      if (!faqButton || !faqAnswer) return;

      faqItem.classList.toggle("open", open);
      faqButton.setAttribute("aria-expanded", open ? "true" : "false");
      faqAnswer.hidden = !open;
    };

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      setFaqState(openItem, false);
    });

    if (!isOpen) {
      setFaqState(item, true);
    }
  }

  window.Aktiendepot24SiteShell = {
    ...(window.Aktiendepot24SiteShell || {}),
    toggleFaq,
  };

  document.querySelectorAll(".faq-q").forEach((button) => {
    button.addEventListener("click", () => toggleFaq(button));
  });
})();

const segmentTitles = {
  depot: 'Depot',
  broker: 'Online Broker',
  etf: 'ETF Sparplan',
  junior: 'Junior Depot'
};

function switchSegment(seg, btn) {
  document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const title = segmentTitles[seg] || segmentTitles.depot;
  const titleNode = document.getElementById('segment-title');
  if (titleNode) titleNode.textContent = title;

  const container = document.getElementById('cards-container');
  if (!container) return;

  container.querySelectorAll('[data-segment-card]').forEach(card => {
    card.hidden = card.dataset.segmentCard !== seg;
  });
}

function initSegmentSwitcher() {
  const activeButton = document.querySelector('.seg-btn.active[data-seg]') || document.querySelector('.seg-btn[data-seg]');

  document.addEventListener('click', event => {
    const button = event.target.closest('.seg-btn[data-seg]');
    if (!button) return;
    switchSegment(button.dataset.seg, button);
  });

  if (activeButton) switchSegment(activeButton.dataset.seg, activeButton);
}

initSegmentSwitcher();

(function() {
  const cards = document.querySelectorAll('.seg-card');
  if (!cards.length) return;
  cards[0].classList.add('active');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      cards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();
