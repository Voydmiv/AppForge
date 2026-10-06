// BMI + Waist Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
    let selectedGender = 'male';
    
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const waistInput = document.getElementById('waist');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultCard = document.getElementById('resultCard');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const scaleFill = document.getElementById('scaleFill');
    const scaleMarker = document.getElementById('scaleMarker');
    const waistValue = document.getElementById('waistValue');
    const waistCategory = document.getElementById('waistCategory');
    const waistRatio = document.getElementById('waistRatio');
    const riskIndicator = document.getElementById('riskIndicator');
    const riskLevel = document.getElementById('riskLevel');
    const recommendations = document.getElementById('recommendations');
    const genderBtns = document.querySelectorAll('.gender-btn');

    // Gender selection
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedGender = btn.dataset.gender;
        });
    });

    // BMI Categories
    const bmiCategories = {
        underweight: {
            label: 'НЕДОСТАТОЧНЫЙ ВЕС',
            color: '#4FC3F7'
        },
        normal: {
            label: 'НОРМА',
            color: '#66BB6A'
        },
        overweight: {
            label: 'ИЗБЫТОЧНЫЙ ВЕС',
            color: '#FFB800'
        },
        obese: {
            label: 'ОЖИРЕНИЕ',
            color: '#EF5350'
        }
    };

    // Waist circumference thresholds (in cm)
    const waistThresholds = {
        male: {
            low: 94,
            high: 102
        },
        female: {
            low: 80,
            high: 88
        }
    };

    // Calculate BMI
    calculateBtn.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const waist = parseFloat(waistInput.value);

        // Validation
        if (!weight || !height || !waist || weight <= 0 || height <= 0 || waist <= 0) {
            alert('Пожалуйста, заполните все поля корректными значениями');
            return;
        }

        // Show loading effect
        calculateBtn.disabled = true;
        calculateBtn.querySelector('.btn-text').textContent = 'АНАЛИЗ...';

        // Simulate calculation delay
        setTimeout(() => {
            // Calculate BMI
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            
            // Calculate Waist-to-Height Ratio (WHtR)
            const whtr = waist / height;
            
            // Determine BMI category
            let bmiCat;
            if (bmi < 18.5) {
                bmiCat = bmiCategories.underweight;
            } else if (bmi < 25) {
                bmiCat = bmiCategories.normal;
            } else if (bmi < 30) {
                bmiCat = bmiCategories.overweight;
            } else {
                bmiCat = bmiCategories.obese;
            }

            // Determine waist category
            const thresholds = waistThresholds[selectedGender];
            let waistCat, waistRisk;
            
            if (waist < thresholds.low) {
                waistCat = 'НИЗКИЙ РИСК';
                waistRisk = 'low';
            } else if (waist < thresholds.high) {
                waistCat = 'ПОВЫШЕННЫЙ РИСК';
                waistRisk = 'medium';
            } else {
                waistCat = 'ВЫСОКИЙ РИСК';
                waistRisk = 'high';
            }

            // Determine overall risk
            let overallRisk, riskClass, recommendationsList;
            
            if (bmiCat === bmiCategories.underweight) {
                overallRisk = 'ТРЕБУЕТСЯ ВНИМАНИЕ';
                riskClass = 'medium';
                recommendationsList = [
                    'Недостаточный вес может указывать на проблемы со здоровьем',
                    'Проконсультируйтесь с врачом для выявления причин',
                    'Увеличьте калорийность рациона',
                    'Добавьте силовые тренировки для набора мышечной массы',
                    'Ешьте чаще, но небольшими порциями'
                ];
            } else if (bmiCat === bmiCategories.normal && waistRisk === 'low') {
                overallRisk = 'НИЗКИЙ РИСК';
                riskClass = 'low';
                recommendationsList = [
                    'Отличные показатели! Продолжайте в том же духе',
                    'Поддерживайте текущий уровень физической активности',
                    'Сбалансированное питание',
                    'Регулярные медицинские осмотры (раз в год)',
                    'Избегайте вредных привычек'
                ];
            } else if (bmiCat === bmiCategories.normal && waistRisk !== 'low') {
                overallRisk = 'ПОВЫШЕННЫЙ РИСК';
                riskClass = 'medium';
                recommendationsList = [
                    'Нормальный ИМТ, но увеличена окружность талии',
                    'Это может указывать на висцеральный жир',
                    'Добавьте кардиотренировки (бег, плавание, велосипед)',
                    'Уменьшите потребление простых углеводов',
                    'Избегайте алкоголя и сладких напитков',
                    'Увеличьте потребление клетчатки'
                ];
            } else if (bmiCat === bmiCategories.overweight && waistRisk === 'low') {
                overallRisk = 'СРЕДНИЙ РИСК';
                riskClass = 'medium';
                recommendationsList = [
                    'Небольшой избыток веса при нормальной талии',
                    'Возможно, это мышечная масса',
                    'Увеличьте физическую активность',
                    'Контролируйте размер порций',
                    'Избегайте перекусов между основными приёмами пищи',
                    'Пейте больше воды (2-3 литра в день)'
                ];
            } else if ((bmiCat === bmiCategories.overweight && waistRisk !== 'low') || 
                       (bmiCat === bmiCategories.obese && waistRisk === 'medium')) {
                overallRisk = 'ВЫСОКИЙ РИСК';
                riskClass = 'high';
                recommendationsList = [
                    'Избыточный вес и увеличенная талия',
                    'Повышен риск сердечно-сосудистых заболеваний',
                    'Проконсультируйтесь с врачом',
                    'Разработайте план похудения с диетологом',
                    'Начните с регулярных прогулок (30 минут в день)',
                    'Исключите фастфуд, сладости и газировку',
                    'Ведите дневник питания'
                ];
            } else {
                overallRisk = 'ОЧЕНЬ ВЫСОКИЙ РИСК';
                riskClass = 'high';
                recommendationsList = [
                    'Критические показатели здоровья',
                    'Необходима срочная консультация врача',
                    'Высокий риск диабета 2 типа и сердечных заболеваний',
                    'Требуется комплексная программа похудения',
                    'Рассмотрите работу с эндокринологом',
                    'Начните с малых изменений в образе жизни',
                    'Измеряйте давление регулярно'
                ];
            }

            // Update UI - BMI
            bmiValue.textContent = bmi.toFixed(1);
            bmiValue.style.color = bmiCat.color;
            bmiCategory.textContent = bmiCat.label;
            bmiCategory.style.color = bmiCat.color;

            // Update BMI scale
            const bmiPercentage = Math.min((bmi / 40) * 100, 100);
            scaleFill.style.width = bmiPercentage + '%';
            scaleMarker.style.left = bmiPercentage + '%';

            // Update UI - Waist
            waistValue.textContent = waist.toFixed(1) + ' см';
            waistCategory.textContent = waistCat;
            
            const genderText = selectedGender === 'male' ? 'М' : 'Ж';
            waistRatio.textContent = `WHtR: ${whtr.toFixed(2)} (норма < 0.5)`;
            
            if (waistRisk === 'low') {
                waistCategory.style.color = '#66BB6A';
            } else if (waistRisk === 'medium') {
                waistCategory.style.color = '#FFB800';
            } else {
                waistCategory.style.color = '#EF5350';
            }

            // Update risk indicator
            riskIndicator.className = 'risk-indicator ' + riskClass;
            riskLevel.textContent = overallRisk;

            // Update recommendations
            recommendations.innerHTML = `
                <h3>РЕКОМЕНДАЦИИ</h3>
                <ul>
                    ${recommendationsList.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            `;

            // Show result
            resultCard.classList.remove('hidden');
            
            // Reset button
            calculateBtn.disabled = false;
            calculateBtn.querySelector('.btn-text').textContent = 'ВЫПОЛНИТЬ АНАЛИЗ';

            // Scroll to result
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 800);
    });

    // Allow Enter key to calculate
    [weightInput, heightInput, waistInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateBtn.click();
            }
        });
    });

    // Register Service Worker for offline support
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    }
});