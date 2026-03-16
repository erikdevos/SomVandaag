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
        difficultyFilter: 'all',

        categories: {
            tafels: {
                title: 'Tafeltjes',
                difficulty: 'basis',
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
                difficulty: 'basis',
                subcategories: [
                    { id: 'tot10', name: 'Tot 10', icon: '🔢', type: 'add', max: 10 },
                    { id: 'over10', name: 'Over de 10', icon: '📈', type: 'add', min: 5, max: 15 },
                    { id: 'tientallen', name: 'Tientallen', icon: '💯', type: 'add', min: 10, max: 99 },
                    { id: 'over100', name: 'Over de 100', icon: '🚀', type: 'add', min: 50, max: 150 },
                ]
            },
            aftrekken: {
                title: 'Aftrekken',
                difficulty: 'basis',
                subcategories: [
                    { id: 'af_tot10', name: 'Tot 10', icon: '🔢', type: 'sub', max: 10 },
                    { id: 'af_tot20', name: 'Tot 20', icon: '📉', type: 'sub', max: 20 },
                    { id: 'af_tientallen', name: 'Tientallen', icon: '💯', type: 'sub', max: 100 },
                ]
            },
            delen: {
                title: 'Delen',
                difficulty: 'basis',
                subcategories: [
                    { id: 'delen_makkelijk', name: 'Makkelijk (hele getallen)', icon: '🟢', type: 'div_easy' },
                    { id: 'delen_moeilijk', name: 'Moeilijker (met rest)', icon: '🟠', type: 'div_hard' },
                ]
            },
            vermenigvuldigen: {
                title: 'Vermenigvuldigen',
                difficulty: 'basis',
                subcategories: [
                    { id: 'verm_tot20', name: 'Tot 20', icon: '🔢', type: 'mult', max: 20 },
                    { id: 'verm_tot50', name: 'Tot 50', icon: '📊', type: 'mult', max: 50 },
                    { id: 'verm_tot100', name: 'Tot 100', icon: '💯', type: 'mult', max: 100 },
                ]
            },
            breuken: {
                title: 'Breuken',
                difficulty: 'moeilijk',
                subcategories: [
                    { id: 'breuk_helft', name: '1/2 van...', icon: '½', type: 'frac_half' },
                    { id: 'breuk_kwart', name: '1/4 van...', icon: '¼', type: 'frac_quarter' },
                    { id: 'breuk_mix', name: 'Gemengd', icon: '🎲', type: 'frac_mix' },
                ]
            },
            kommagetallen: {
                title: 'Kommagetallen',
                difficulty: 'moeilijk',
                subcategories: [
                    { id: 'komma_optellen', name: 'Optellen', icon: '➕', type: 'dec_add' },
                    { id: 'komma_aftrekken', name: 'Aftrekken', icon: '➖', type: 'dec_sub' },
                ]
            },
            procenten: {
                title: 'Procenten',
                difficulty: 'moeilijk',
                subcategories: [
                    { id: 'proc_10', name: '10% van...', icon: '🔟', type: 'perc_10' },
                    { id: 'proc_25', name: '25% van...', icon: '🎯', type: 'perc_25' },
                    { id: 'proc_50', name: '50% van...', icon: '½', type: 'perc_50' },
                ]
            },
            kwadraten: {
                title: 'Kwadraten',
                difficulty: 'moeilijk',
                subcategories: [
                    { id: 'kwadraat_tot10', name: 'Tot 10²', icon: '²', type: 'square', max: 10 },
                    { id: 'kwadraat_tot15', name: 'Tot 15²', icon: '🔢', type: 'square', max: 15 },
                    { id: 'kwadraat_tot20', name: 'Tot 20²', icon: '💯', type: 'square', max: 20 },
                ]
            },
            wortels: {
                title: 'Wortels',
                difficulty: 'moeilijk',
                subcategories: [
                    { id: 'wortel_tot10', name: 'Tot √100', icon: '√', type: 'sqrt', max: 10 },
                    { id: 'wortel_tot15', name: 'Tot √225', icon: '🔢', type: 'sqrt', max: 15 },
                ]
            },
            negatief: {
                title: 'Negatieve getallen',
                difficulty: 'moeilijk',
                subcategories: [
                    { id: 'neg_optellen', name: 'Optellen', icon: '➕', type: 'neg_add' },
                    { id: 'neg_aftrekken', name: 'Aftrekken', icon: '➖', type: 'neg_sub' },
                    { id: 'neg_mix', name: 'Gemengd', icon: '🎲', type: 'neg_mix' },
                ]
            },
            eenheden: {
                title: 'Eenheden omrekenen',
                difficulty: 'moeilijk',
                subcategories: [
                    { id: 'eenheid_lengte', name: 'Lengte (cm ↔ m)', icon: '📏', type: 'unit_length' },
                    { id: 'eenheid_gewicht', name: 'Gewicht (g ↔ kg)', icon: '⚖️', type: 'unit_weight' },
                    { id: 'eenheid_tijd', name: 'Tijd (min ↔ uur)', icon: '⏰', type: 'unit_time' },
                ]
            },
            verhoudingen: {
                title: 'Verhoudingen',
                difficulty: 'moeilijk',
                subcategories: [
                    { id: 'verh_makkelijk', name: 'Eenvoudig', icon: '🎯', type: 'ratio_easy' },
                    { id: 'verh_moeilijk', name: 'Uitdagend', icon: '🔢', type: 'ratio_hard' },
                ]
            },
            klokkijken: {
                title: 'Klokkijken',
                difficulty: 'basis',
                subcategories: [
                    { id: 'klok_hele_uren', name: 'Hele uren', icon: '🕐', type: 'clock_hours' },
                    { id: 'klok_halve_uren', name: 'Halve uren', icon: '🕐', type: 'clock_half' },
                    { id: 'klok_kwartieren', name: 'Kwartieren', icon: '🕐', type: 'clock_quarter' },
                    { id: 'klok_5min', name: 'Per 5 minuten', icon: '🕐', type: 'clock_5min' },
                    { id: 'klok_alle', name: 'Alle minuten', icon: '🕐', type: 'clock_all' },
                ]
            }
        },

        setDifficultyFilter(filter) {
            this.difficultyFilter = filter;
        },

        getFilteredCategories() {
            if (this.difficultyFilter === 'all') {
                return this.categories;
            }
            
            const filtered = {};
            for (const [key, category] of Object.entries(this.categories)) {
                if (category.difficulty === this.difficultyFilter) {
                    filtered[key] = category;
                }
            }
            return filtered;
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
            let isPM1, isPM2, isPM3, isPM4, isPM5;

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

                case 'square': // Kwadraten
                    a = this.randomInt(1, sub.max);
                    answer = a * a;
                    questionText = `${a}² = `;
                    break;

                case 'sqrt': // Wortels
                    answer = this.randomInt(1, sub.max);
                    a = answer * answer;
                    questionText = `√${a} = `;
                    break;

                case 'neg_add': // Negatieve getallen optellen
                    a = this.randomInt(-10, 10);
                    b = this.randomInt(-10, 10);
                    answer = a + b;
                    questionText = `${a} + ${b} = `;
                    break;

                case 'neg_sub': // Negatieve getallen aftrekken
                    a = this.randomInt(-10, 10);
                    b = this.randomInt(-10, 10);
                    answer = a - b;
                    questionText = `${a} − ${b} = `;
                    break;

                case 'neg_mix': // Negatieve getallen gemengd
                    a = this.randomInt(-10, 10);
                    b = this.randomInt(-10, 10);
                    const operation = this.randomInt(0, 1) === 0 ? '+' : '−';
                    if (operation === '+') {
                        answer = a + b;
                        questionText = `${a} + ${b} = `;
                    } else {
                        answer = a - b;
                        questionText = `${a} − ${b} = `;
                    }
                    break;

                case 'unit_length': // Eenheden omrekenen - lengte
                    const lengthDir = this.randomInt(0, 1);
                    if (lengthDir === 0) {
                        // cm naar m
                        a = this.randomInt(50, 500);
                        answer = a / 100;
                        questionText = `${a} cm = ? m`;
                    } else {
                        // m naar cm
                        a = this.randomInt(1, 10) + (this.randomInt(0, 9) / 10);
                        answer = a * 100;
                        questionText = `${a.toFixed(1)} m = ? cm`;
                    }
                    break;

                case 'unit_weight': // Eenheden omrekenen - gewicht
                    const weightDir = this.randomInt(0, 1);
                    if (weightDir === 0) {
                        // g naar kg
                        a = this.randomInt(100, 5000);
                        answer = a / 1000;
                        questionText = `${a} g = ? kg`;
                    } else {
                        // kg naar g
                        a = this.randomInt(1, 10) + (this.randomInt(0, 9) / 10);
                        answer = a * 1000;
                        questionText = `${a.toFixed(1)} kg = ? g`;
                    }
                    break;

                case 'unit_time': // Eenheden omrekenen - tijd
                    const timeDir = this.randomInt(0, 1);
                    if (timeDir === 0) {
                        // min naar uur
                        a = this.randomInt(30, 300);
                        answer = Math.round((a / 60) * 100) / 100;
                        questionText = `${a} min = ? uur`;
                    } else {
                        // uur naar min
                        a = this.randomInt(1, 5) + (this.randomInt(0, 3) * 0.25);
                        answer = a * 60;
                        questionText = `${a} uur = ? min`;
                    }
                    break;

                case 'ratio_easy': // Verhoudingen eenvoudig
                    const ratio1 = this.randomInt(1, 5);
                    const ratio2 = this.randomInt(1, 5);
                    const multiplier = this.randomInt(2, 6);
                    a = ratio1 * multiplier;
                    answer = ratio2 * multiplier;
                    questionText = `${ratio1} : ${ratio2} = ${a} : ?`;
                    break;

                case 'ratio_hard': // Verhoudingen uitdagend
                    const r1 = this.randomInt(2, 8);
                    const r2 = this.randomInt(2, 8);
                    const mult = this.randomInt(3, 10);
                    a = r1 * mult;
                    answer = r2 * mult;
                    questionText = `${r1} : ${r2} = ${a} : ?`;
                    break;

                case 'clock_hours': // Klokkijken - hele uren
                    a = this.randomInt(1, 12);
                    b = 0;
                    isPM1 = this.randomInt(0, 1) === 1;
                    const hours24_1 = isPM1 ? (a === 12 ? 12 : a + 12) : (a === 12 ? 0 : a);
                    answer = `${hours24_1}:00`;
                    questionText = 'Hoe laat is het?';
                    break;

                case 'clock_half': // Klokkijken - halve uren
                    a = this.randomInt(1, 12);
                    b = this.randomInt(0, 1) * 30;
                    isPM2 = this.randomInt(0, 1) === 1;
                    const hours24_2 = isPM2 ? (a === 12 ? 12 : a + 12) : (a === 12 ? 0 : a);
                    answer = `${hours24_2}:${b.toString().padStart(2, '0')}`;
                    questionText = 'Hoe laat is het?';
                    break;

                case 'clock_quarter': // Klokkijken - kwartieren
                    a = this.randomInt(1, 12);
                    b = this.randomInt(0, 3) * 15;
                    isPM3 = this.randomInt(0, 1) === 1;
                    const hours24_3 = isPM3 ? (a === 12 ? 12 : a + 12) : (a === 12 ? 0 : a);
                    answer = `${hours24_3}:${b.toString().padStart(2, '0')}`;
                    questionText = 'Hoe laat is het?';
                    break;

                case 'clock_5min': // Klokkijken - per 5 minuten
                    a = this.randomInt(1, 12);
                    b = this.randomInt(0, 11) * 5;
                    isPM4 = this.randomInt(0, 1) === 1;
                    const hours24_4 = isPM4 ? (a === 12 ? 12 : a + 12) : (a === 12 ? 0 : a);
                    answer = `${hours24_4}:${b.toString().padStart(2, '0')}`;
                    questionText = 'Hoe laat is het?';
                    break;

                case 'clock_all': // Klokkijken - alle minuten
                    a = this.randomInt(1, 12);
                    b = this.randomInt(0, 59);
                    isPM5 = this.randomInt(0, 1) === 1;
                    const hours24_5 = isPM5 ? (a === 12 ? 12 : a + 12) : (a === 12 ? 0 : a);
                    answer = `${hours24_5}:${b.toString().padStart(2, '0')}`;
                    questionText = 'Hoe laat is het?';
                    break;
            }

            // Store isPM for clock questions
            let isPM = undefined;
            if (sub.type === 'clock_hours') isPM = isPM1;
            else if (sub.type === 'clock_half') isPM = isPM2;
            else if (sub.type === 'clock_quarter') isPM = isPM3;
            else if (sub.type === 'clock_5min') isPM = isPM4;
            else if (sub.type === 'clock_all') isPM = isPM5;

            return {
                a,
                b,
                answer,
                questionText,
                userAnswer: null,
                type: sub.type,
                isPM
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
            
            // Handle clock reading exercises (time format)
            if (q.type && q.type.startsWith('clock_')) {
                const userTime = this.userAnswer.trim();
                q.userAnswer = userTime;
                
                // Normalize both answers to H:MM format for comparison
                const normalizeTime = (time) => {
                    const parts = time.split(':');
                    if (parts.length !== 2) return null;
                    const h = parseInt(parts[0]);
                    const m = parseInt(parts[1]);
                    if (isNaN(h) || isNaN(m) || h < 1 || h > 12 || m < 0 || m > 59) return null;
                    return `${h}:${m.toString().padStart(2, '0')}`;
                };
                
                const normalizedUser = normalizeTime(userTime);
                const normalizedAnswer = normalizeTime(q.answer);
                
                this.isCorrect = normalizedUser === normalizedAnswer;
            } else {
                // Handle numeric answers
                const userNum = parseFloat(this.userAnswer);
                q.userAnswer = userNum;
                
                // Types that need decimal tolerance
                const decimalTypes = ['dec_add', 'dec_sub', 'unit_length', 'unit_weight', 'unit_time', 'perc_10', 'perc_25', 'perc_50'];
                
                if (decimalTypes.includes(q.type)) {
                    this.isCorrect = Math.abs(userNum - q.answer) < 0.01;
                } else {
                    this.isCorrect = userNum === q.answer;
                }
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
