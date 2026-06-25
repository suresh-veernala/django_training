/**
 * Shared quiz widget — Django Training workspace
 *
 * Usage: each quiz lives in a <div class="quiz"> with data-quiz-id.
 * Questions are declared as JSON in a <script type="application/json"
 *   data-quiz-data="<same-id>"> block.
 *
 * Question schema:
 *   { q: "Question text",
 *     options: ["A", "B", "C", "D"],   // all same length ideally
 *     answer: 0,                        // index of correct option
 *     explain: "Short explanation." }
 */
(function () {
  function initQuizzes() {
    document.querySelectorAll('.quiz[data-quiz-id]').forEach(function (container) {
      const id = container.getAttribute('data-quiz-id');
      const dataEl = document.querySelector('script[data-quiz-data="' + id + '"]');
      if (!dataEl) return;
      let questions;
      try { questions = JSON.parse(dataEl.textContent); } catch (e) { return; }

      let current = 0;
      let score = 0;

      function render() {
        if (current >= questions.length) {
          container.innerHTML =
            '<div class="quiz-title">Quiz Complete</div>' +
            '<p class="quiz-score">You scored <strong>' + score + ' / ' + questions.length + '</strong>. ' +
            (score === questions.length ? 'Perfect! 🎉' : score >= questions.length / 2 ? 'Good work — review any misses.' : 'Revisit the lesson and try again.') +
            '</p>';
          return;
        }
        const q = questions[current];
        const optHtml = q.options.map(function (opt, i) {
          return '<li><button data-idx="' + i + '">' + escHtml(opt) + '</button></li>';
        }).join('');

        container.innerHTML =
          '<div class="quiz-title">Quick Check — Q' + (current + 1) + ' of ' + questions.length + '</div>' +
          '<div class="quiz-q">' + escHtml(q.q) + '</div>' +
          '<ul class="quiz-options">' + optHtml + '</ul>' +
          '<div class="quiz-feedback" id="qf-' + id + '"></div>' +
          '<div class="quiz-next" id="qn-' + id + '"><button id="qnb-' + id + '">Next →</button>' +
          '<span class="quiz-score"> ' + score + ' correct so far</span></div>';

        container.querySelectorAll('.quiz-options button').forEach(function (btn) {
          btn.addEventListener('click', function () {
            const chosen = parseInt(btn.getAttribute('data-idx'), 10);
            const correct = chosen === q.answer;
            if (correct) score++;

            container.querySelectorAll('.quiz-options button').forEach(function (b) {
              b.disabled = true;
              const idx = parseInt(b.getAttribute('data-idx'), 10);
              if (idx === q.answer) b.classList.add('correct');
              else if (idx === chosen && !correct) b.classList.add('wrong');
            });

            const fb = document.getElementById('qf-' + id);
            fb.textContent = correct ? '✓ Correct. ' + q.explain : '✗ Not quite. ' + q.explain;
            fb.className = 'quiz-feedback show ' + (correct ? 'ok' : 'bad');

            const nxt = document.getElementById('qn-' + id);
            nxt.className = 'quiz-next show';
            document.getElementById('qnb-' + id).addEventListener('click', function () {
              current++;
              render();
            });
          });
        });
      }
      render();
    });
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuizzes);
  } else {
    initQuizzes();
  }
})();
