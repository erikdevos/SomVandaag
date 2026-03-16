function rekenApp() {
    return {
        screen: 'home',
        currentCategory: null,
        currentSubcategory: null,
        questions: [],
        currentQuestionIndex: 0,
        userAnswer: '',
        showFeedback: false,
        isCorrect: false,
        score: 0,
        historyItems: [],

        categories: {
            tafels: {
                title: 'Tafeltjes',
                subcategories: [
                    { id: 'tafel1', name: 'Tafel van 1', icon: '1️⃣', type: 'single', table: 1 },
                    { id: 'tafel2', name: 'Tafel van 2', icon: '2️⃣', type: 'single', table: 2 },
                    { id: 'tafel3', name: 'Tafel van 3', icon: '3️⃣', type: 'single', table: 3 },
                    { id: 'tafel4', name: 'Tafel van 4', icon: '4️⃣', type: 'single', table: 4 },
                    { id: 'tafel5', name: 'Tafel van 5', icon: '5️⃣', type: 'single', table: 5 },
                    { id: 'tafel6', name: 'Tafel van 6', icon: '6️⃣', type: 'single', table: 6 },
                    { id: 'tafel7', name: 'Tafel van 7', icon: '7️⃣', type: 'single', table: 7 },
                    { id: 'tafel8', name: 'Tafel van 8', icon: '8️⃣', type: 'single', table: 8 },
                    { id: 'tafel9', name: 'Tafel van 9', icon: '9️⃣', type: 'single', table: 9 },
                    { id: 'tafel10', name: 'Tafel van 10', icon: '🔟', type: 'single', table: 10 },
                    { id: 'tafels_mix', name: 'Alle tafels door elkaar', icon: '🎲', type: 'mix' },
                ]
            },
            optellen: {
                title: 'Optellen',
                subcategories: [
                    { id: 'tot10', name: 'Tot 10', icon: '🔢', type: 'add', max: 10 },
                    { id: 'over10', name: 'Over de 10', icon: '📈', type: 'add', min: 5, max: 15 },
                    { id: 'tientallen', name: 'Tientallen', icon: '💯', type: 'add', min: 10, max: 99 },
                    { id: 'over100', name: 'Over de 100', icon: '🚀', type: 'add', min: 50, max: 150 },
                ]
            },
            aftrekken: {
                title: 'Aftrekken',
                subcategories: [
                    { id: 'af_tot10', name: 'Tot 10', icon: '🔢', type: 'sub', max: 10 },
                    { id: 'af_tot20', name: 'Tot 20', icon: '📉', type: 'sub', max: 20 },
                    { id: 'af_tientallen', name: 'Tientallen', icon: '💯', type: 'sub', max: 100 },
                ]
            },
            delen: {
                title: 'Delen',
                subcategories: [
                    { id: 'delen_makkelijk', name: 'Makkelijk (hele getallen)', icon: '🟢', type: 'div_easy' },
                    { id: 'delen_moeilijk', name: 'Moeilijker (met rest)', icon: '🟠', type: 'div_hard' },
                ]
            },
            vermenigvuldigen: {
                title: 'Vermenigvuldigen',
                subcategories: [
                    { id: 'verm_tot20', name: 'Tot 20', icon: '🔢', type: 'mult', max: 20 },
                    { id: 'verm_tot50', name: 'Tot 50', icon: '📊', type: 'mult', max: 50 },
                    { id: 'verm_tot100', name: 'Tot 100', icon: '💯', type: 'mult', max: 100 },
                ]
            },
            breuken: {
                title: 'Breuken',
                subcategories: [
                    { id: 'breuk_helft', name: '1/2 van...', icon: '½', type: 'frac_half' },
                    { id: 'breuk_kwart', name: '1/4 van...', icon: '¼', type: 'frac_quarter' },
                    { id: 'breuk_mix', name: 'Gemengd', icon: '🎲', type: 'frac_mix' },
                ]
            },
            kommagetallen: {
                title: 'Kommagetallen',
                subcategories: [
                    { id: 'komma_optellen', name: 'Optellen', icon: '➕', type: 'dec_add' },
                    { id: 'komma_aftrekken', name: 'Aftrekken', icon: '➖', type: 'dec_sub' },
                ]
            },
            procenten: {
                title: 'Procenten',
                subcategories: [
                    { id: 'proc_10', name: '10% van...', icon: '🔟', type: 'perc_10' },
                    { id: 'proc_25', name: '25% van...', icon: '🎯', type: 'perc_25' },
                    { id: 'proc_50', name: '50% van...', icon: '½', type: 'perc_50' },
                ]
            }
        },

        selectCategory(category) {
            this.currentCategory = category;
            this.screen = 'subcategory';
        },

        getCategoryTitle() {
            return this.categories[this.currentCategory]?.title || '';
        },

        getSubcategories() {
            return this.categories[this.currentCategory]?.subcategories || [];
        },

        goHome() {
            this.screen = 'home';
            this.currentCategory = null;
            this.currentSubcategory = null;
            this.resetQuiz();
        },

        goToHistory() {
            this.loadHistory();
            this.screen = 'history';
        },

        loadHistory() {
            try {
                const history = JSON.parse(localStorage.getItem('somvandaag_history') || '[]');
                this.historyItems = history.slice(-25).reverse();
            } catch (e) {
                console.log('Could not load history:', e);
                this.historyItems = [];
            }
        },

        goToSubcategory() {
            this.screen = 'subcategory';
            this.resetQuiz();
        },

        resetQuiz() {
            this.questions = [];
            this.currentQuestionIndex = 0;
            this.userAnswer = '';
            this.showFeedback = false;
            this.isCorrect = false;
            this.score = 0;
        },

        startQuiz(subcategory) {
            this.currentSubcategory = subcategory;
            this.resetQuiz();
            this.generateQuestions(subcategory);
            this.screen = 'quiz';
            this.$nextTick(() => {
                this.$refs.answerInput?.focus();
            });
        },

        generateQuestions(sub) {
            this.questions = [];
            const usedQuestions = new Set();
            
            while (this.questions.length < 10) {
                let question = this.createQuestion(sub);
                const questionKey = `${question.questionText}${question.answer}`;
                
                if (!usedQuestions.has(questionKey)) {
                    usedQuestions.add(questionKey);
                    this.questions.push(question);
                }
            }
        },

        createQuestion(sub) {
            let a, b, answer, questionText;

            switch (sub.type) {
                case 'single': // Enkele tafel
                    a = sub.table;
                    b = this.randomInt(1, 10);
                    answer = a * b;
                    questionText = `${a} × ${b} = `;
                    break;

                case 'mix': // Alle tafels door elkaar
                    a = this.randomInt(1, 10);
                    b = this.randomInt(1, 10);
                    answer = a * b;
                    questionText = `${a} × ${b} = `;
                    break;

                case 'add': // Optellen
                    if (sub.max <= 10) {
                        a = this.randomInt(1, sub.max - 1);
                        b = this.randomInt(1, sub.max - a);
                    } else if (sub.min && sub.max) {
                        a = this.randomInt(sub.min, sub.max);
                        b = this.randomInt(sub.min, sub.max);
                    } else {
                        a = this.randomInt(1, sub.max);
                        b = this.randomInt(1, sub.max);
                    }
                    answer = a + b;
                    questionText = `${a} + ${b} = `;
                    break;

                case 'sub': // Aftrekken
                    a = this.randomInt(2, sub.max);
                    b = this.randomInt(1, a - 1);
                    answer = a - b;
                    questionText = `${a} - ${b} = `;
                    break;

                case 'div_easy': // Delen met hele getallen
                    b = this.randomInt(2, 10);
                    answer = this.randomInt(1, 10);
                    a = b * answer;
                    questionText = `${a} ÷ ${b} = `;
                    break;

                case 'div_hard': // Delen met rest (gebroken getallen)
                    a = this.randomInt(10, 30);
                    b = this.randomInt(2, 9);
                    while (a % b === 0) {
                        a = this.randomInt(10, 30);
                    }
                    answer = Math.floor(a / b);
                    questionText = `${a} ÷ ${b} = `;
                    break;

                case 'mult': // Vermenigvuldigen met grotere getallen
                    if (sub.max <= 20) {
                        a = this.randomInt(11, 15);
                        b = this.randomInt(2, 5);
                    } else if (sub.max <= 50) {
                        a = this.randomInt(11, 20);
                        b = this.randomInt(2, 9);
                    } else {
                        a = this.randomInt(11, 25);
                        b = this.randomInt(2, 12);
                    }
                    answer = a * b;
                    questionText = `${a} × ${b} = `;
                    break;

                case 'frac_half': // 1/2 van een getal
                    a = this.randomInt(2, 20) * 2;
                    answer = a / 2;
                    questionText = `1/2 van ${a} = `;
                    break;

                case 'frac_quarter': // 1/4 van een getal
                    a = this.randomInt(2, 10) * 4;
                    answer = a / 4;
                    questionText = `1/4 van ${a} = `;
                    break;

                case 'frac_mix': // Gemengde breuken
                    const fractions = [
                        { num: 1, denom: 2, mult: 2 },
                        { num: 1, denom: 3, mult: 3 },
                        { num: 1, denom: 4, mult: 4 },
                        { num: 1, denom: 5, mult: 5 }
                    ];
                    const frac = fractions[this.randomInt(0, fractions.length - 1)];
                    a = this.randomInt(2, 10) * frac.mult;
                    answer = a / frac.denom;
                    questionText = `${frac.num}/${frac.denom} van ${a} = `;
                    break;

                case 'dec_add': // Kommagetallen optellen
                    a = this.randomInt(1, 20) + (this.randomInt(0, 9) / 10);
                    b = this.randomInt(1, 20) + (this.randomInt(0, 9) / 10);
                    answer = Math.round((a + b) * 10) / 10;
                    questionText = `${a.toFixed(1)} + ${b.toFixed(1)} = `;
                    break;

                case 'dec_sub': // Kommagetallen aftrekken
                    a = this.randomInt(10, 30) + (this.randomInt(0, 9) / 10);
                    b = this.randomInt(1, Math.floor(a) - 1) + (this.randomInt(0, 9) / 10);
                    answer = Math.round((a - b) * 10) / 10;
                    questionText = `${a.toFixed(1)} - ${b.toFixed(1)} = `;
                    break;

                case 'perc_10': // 10% van een getal
                    a = this.randomInt(10, 100);
                    answer = a * 0.1;
                    questionText = `10% van ${a} = `;
                    break;

                case 'perc_25': // 25% van een getal
                    a = this.randomInt(4, 40) * 4;
                    answer = a * 0.25;
                    questionText = `25% van ${a} = `;
                    break;

                case 'perc_50': // 50% van een getal
                    a = this.randomInt(10, 100);
                    answer = a * 0.5;
                    questionText = `50% van ${a} = `;
                    break;
            }

            return {
                a,
                b,
                answer,
                questionText,
                userAnswer: null,
                type: sub.type
            };
        },

        randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        getCurrentQuestion() {
            const q = this.questions[this.currentQuestionIndex];
            if (q.type === 'div_hard') {
                return q.questionText + ' (hele getal)';
            }
            return q.questionText;
        },

        checkAnswer() {
            if (this.userAnswer === '' || this.showFeedback) return;

            const q = this.questions[this.currentQuestionIndex];
            const userNum = parseFloat(this.userAnswer);
            
            q.userAnswer = userNum;
            
            if (q.type === 'dec_add' || q.type === 'dec_sub') {
                this.isCorrect = Math.abs(userNum - q.answer) < 0.01;
            } else {
                this.isCorrect = userNum === q.answer;
            }
            
            if (this.isCorrect) {
                this.score++;
            }

            this.showFeedback = true;
            this.saveProgress();
        },

        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                this.userAnswer = '';
                this.showFeedback = false;
                this.$nextTick(() => {
                    this.$refs.answerInput?.focus();
                });
            } else {
                this.screen = 'results';
                this.$nextTick(() => {
                    if (this.score >= 8) {
                        this.showConfetti();
                    }
                });
            }
        },

        restartQuiz() {
            this.startQuiz(this.currentSubcategory);
        },

        getResultEmoji() {
            const percentage = (this.score / this.questions.length) * 100;
            if (percentage === 100) return '🏆';
            if (percentage >= 80) return '🌟';
            if (percentage >= 60) return '😊';
            if (percentage >= 40) return '💪';
            return '📚';
        },

        getResultMessage() {
            const percentage = (this.score / this.questions.length) * 100;
            if (percentage === 100) return 'Perfect! Alle antwoorden goed!';
            if (percentage >= 80) return 'Heel goed gedaan!';
            if (percentage >= 60) return 'Goed bezig! Blijf oefenen!';
            if (percentage >= 40) return 'Je kunt het! Probeer het nog eens!';
            return 'Oefening baart kunst! Probeer het opnieuw!';
        },

        saveProgress() {
            try {
                const history = JSON.parse(localStorage.getItem('somvandaag_history') || '[]');
                history.push({
                    date: new Date().toISOString(),
                    category: this.currentCategory,
                    subcategory: this.currentSubcategory?.id,
                    score: this.score,
                    total: this.questions.length
                });
                if (history.length > 100) {
                    history.shift();
                }
                localStorage.setItem('somvandaag_history', JSON.stringify(history));
            } catch (e) {
                console.log('Could not save progress:', e);
            }
        },

        getHistoryTitle(item) {
            const categoryTitle = this.categories[item.category]?.title || item.category;
            const subcategory = this.categories[item.category]?.subcategories.find(s => s.id === item.subcategory);
            const subcategoryName = subcategory?.name || '';
            
            if (subcategoryName) {
                return `${categoryTitle} - ${subcategoryName}`;
            }
            return categoryTitle;
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 1) return 'Zojuist';
            if (diffMins < 60) return `${diffMins} minuten geleden`;
            if (diffHours < 24) return `${diffHours} uur geleden`;
            if (diffDays === 1) return 'Gisteren';
            if (diffDays < 7) return `${diffDays} dagen geleden`;
            
            return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
        },

        showConfetti() {
            if (typeof confetti === 'undefined') return;

            const count = 200;
            const defaults = {
                origin: { y: 0.7 }
            };

            function fire(particleRatio, opts) {
                confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio)
                });
            }

            fire(0.25, {
                spread: 26,
                startVelocity: 55,
            });
            fire(0.2, {
                spread: 60,
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
            });
        }
    };
}
