import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, TrendingUp, BarChart3, LineChart, Target, CheckCircle, Send, Award, Users, Clock } from 'lucide-react'

// Web3Forms Handler Hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e, accessKey) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    
    const formData = new FormData(e.target);
    formData.append('access_key', accessKey);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);
        e.target.reset();
      } else {
        setIsError(true);
        setErrorMessage(data.message || 'Что-то пошло не так');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Ошибка сети. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
  };
  
  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm };
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const courses = [
    {
      title: 'Основы Трейдинга',
      description: 'Изучите базовые принципы торговли на финансовых рынках, технический и фундаментальный анализ',
      price: '15 000 ₽',
      features: ['6 недель обучения', 'Практические задания', 'Сертификат', 'Поддержка куратора'],
      icon: LineChart
    },
    {
      title: 'Продвинутые Стратегии',
      description: 'Освойте профессиональные торговые стратегии, управление рисками и психологию трейдинга',
      price: '35 000 ₽',
      features: ['10 недель обучения', 'Реальные кейсы', 'Личный наставник', 'Доступ к сообществу'],
      popular: true,
      icon: TrendingUp
    },
    {
      title: 'Алгоритмический Трейдинг',
      description: 'Создавайте торговых роботов и автоматизируйте свою торговлю с помощью Python',
      price: '50 000 ₽',
      features: ['12 недель обучения', 'Программирование', 'Готовые алгоритмы', 'VIP поддержка'],
      icon: BarChart3
    }
  ];

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-darker-gray text-white overflow-x-hidden">
      {/* SIDE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed left-0 top-0 h-full w-80 bg-dark-gray border-r border-red-900/30 z-50 shadow-2xl grainy"
            >
              <div className="p-8">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-3 mb-12">
                  <Target className="w-8 h-8 text-red-600" />
                  <span className="text-2xl font-bold">TradePro</span>
                </div>
                
                <nav className="space-y-6">
                  <button
                    onClick={() => scrollToSection('hero')}
                    className="block w-full text-left text-lg text-gray-300 hover:text-red-500 transition-colors"
                  >
                    Главная
                  </button>
                  <button
                    onClick={() => scrollToSection('courses')}
                    className="block w-full text-left text-lg text-gray-300 hover:text-red-500 transition-colors"
                  >
                    Курсы
                  </button>
                  <button
                    onClick={() => scrollToSection('benefits')}
                    className="block w-full text-left text-lg text-gray-300 hover:text-red-500 transition-colors"
                  >
                    Преимущества
                  </button>
                  <button
                    onClick={() => scrollToSection('consultation')}
                    className="block w-full text-left text-lg text-gray-300 hover:text-red-500 transition-colors"
                  >
                    Консультация
                  </button>
                </nav>
                
                <div className="mt-12 pt-12 border-t border-gray-800">
                  <button
                    onClick={() => scrollToSection('consultation')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
                  >
                    Записаться на курс
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-dark-gray/95 backdrop-blur-md z-30 border-b border-red-900/30">
        <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between max-w-full">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] justify-center"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-red-600" />
            <span className="text-xl md:text-2xl font-bold">TradePro</span>
          </div>
          
          <button
            onClick={() => scrollToSection('consultation')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-colors text-sm md:text-base min-h-[44px]"
          >
            Консультация
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section id="hero" className="relative pt-32 pb-20 px-4 md:px-6 grainy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-darker-gray to-darker-gray" />
        <div className="container mx-auto text-center relative z-10 max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight">
              Станьте Успешным
              <br />
              <span className="text-red-600">Трейдером</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 font-semibold max-w-3xl mx-auto px-4">
              Профессиональное обучение торговле на финансовых рынках
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed px-4">
              Освойте прибыльные стратегии, научитесь управлять рисками и начните зарабатывать на трейдинге уже через 6 недель
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <button
                onClick={() => scrollToSection('courses')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-4 rounded-lg text-base sm:text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-red-600/50 min-h-[44px]"
              >
                Выбрать курс
              </button>
              <button
                onClick={() => scrollToSection('consultation')}
                className="bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-4 rounded-lg text-base sm:text-lg font-bold transition-all backdrop-blur-sm border border-white/20 min-h-[44px]"
              >
                Получить консультацию
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20 px-4 md:px-6 bg-gradient-to-b from-darker-gray to-dark-gray">
        <div className="container mx-auto max-w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-16 px-4">
            Почему <span className="text-red-600">Выбирают Нас?</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-dark-gray to-darker-gray p-6 md:p-8 rounded-2xl border border-red-900/30 hover:border-red-600/50 transition-all transform hover:scale-105 grainy"
            >
              <div className="bg-red-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-red-600">Опытные Наставники</h3>
              <p className="text-gray-400 leading-relaxed">
                Учитесь у профессиональных трейдеров с 10+ летним опытом работы на финансовых рынках
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-dark-gray to-darker-gray p-6 md:p-8 rounded-2xl border border-red-900/30 hover:border-red-600/50 transition-all transform hover:scale-105 grainy"
            >
              <div className="bg-red-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-red-600">Практический Подход</h3>
              <p className="text-gray-400 leading-relaxed">
                80% времени - практика на реальных графиках и разбор торговых ситуаций
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-dark-gray to-darker-gray p-6 md:p-8 rounded-2xl border border-red-900/30 hover:border-red-600/50 transition-all transform hover:scale-105 grainy"
            >
              <div className="bg-red-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-red-600">Поддержка 24/7</h3>
              <p className="text-gray-400 leading-relaxed">
                Круглосуточная помощь кураторов и доступ к закрытому сообществу трейдеров
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COURSES GALLERY */}
      <section id="courses" className="py-20 px-4 md:px-6 grainy">
        <div className="container mx-auto max-w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-4 px-4">
            <span className="text-red-600">Наши Курсы</span>
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto text-base md:text-lg px-4">
            Выберите программу обучения, которая подходит вашему уровню подготовки
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-gradient-to-br from-dark-gray to-darker-gray p-6 md:p-8 rounded-2xl border transition-all transform hover:scale-105 grainy ${
                    course.popular ? 'border-red-600 shadow-xl shadow-red-600/30' : 'border-red-900/30 hover:border-red-600/50'
                  }`}
                >
                  {course.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                        Популярный
                      </span>
                    </div>
                  )}
                  
                  <div className="bg-red-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-red-500" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed min-h-[60px]">
                    {course.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="text-4xl md:text-5xl font-black text-red-600 mb-2">
                      {course.price}
                    </div>
                    <div className="text-gray-500 text-sm">разовый платеж</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => scrollToSection('consultation')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg min-h-[44px]"
                  >
                    Купить курс
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section id="consultation" className="py-20 px-4 md:px-6 bg-gradient-to-b from-dark-gray to-darker-gray">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-dark-gray to-darker-gray p-6 sm:p-8 md:p-12 rounded-2xl border border-red-900/30 grainy"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-4">
              <span className="text-red-600">Бесплатная Консультация</span>
            </h2>
            <p className="text-center text-gray-400 mb-8 md:mb-12 text-base md:text-lg">
              Оставьте заявку и получите персональную консультацию по выбору курса
            </p>
            
            <ConsultationForm />
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 md:px-6 grainy telegram-safe-bottom">
        <div className="container mx-auto text-center max-w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 px-4">
            Готовы Начать <span className="text-red-600">Зарабатывать?</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto px-4">
            Присоединяйтесь к 500+ успешным студентам. Первый урок бесплатно!
          </p>
          <button
            onClick={() => scrollToSection('consultation')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-red-600/50 min-h-[44px]"
          >
            Записаться на курс
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-darker-gray border-t border-red-900/30 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-red-600" />
              <span className="text-xl font-bold">TradePro</span>
            </div>
            <div className="text-gray-500 text-sm text-center">
              © 2024 TradePro. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Consultation Form Component
const ConsultationForm = () => {
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler();
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // Replace with your Web3Forms Access Key from https://web3forms.com
  
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-darker-gray border border-red-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-darker-gray border border-red-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                required
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-darker-gray border border-red-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            
            <div>
              <select
                name="course"
                required
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-darker-gray border border-red-900/30 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="">Выберите курс</option>
                <option value="basic">Основы Трейдинга</option>
                <option value="advanced">Продвинутые Стратегии</option>
                <option value="algo">Алгоритмический Трейдинг</option>
              </select>
            </div>
            
            <div>
              <textarea
                name="message"
                placeholder="Ваш вопрос или комментарий (необязательно)"
                rows="4"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-darker-gray border border-red-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
              ></textarea>
            </div>
            
            {isError && (
              <div className="text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 md:px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2 min-h-[44px]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Получить консультацию
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="text-center py-12"
          >
            <div className="bg-red-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Заявка Отправлена!
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Спасибо за обращение. Наш менеджер свяжется с вами в ближайшее время.
            </p>
            <button
              onClick={resetForm}
              className="text-red-500 hover:text-red-400 font-semibold transition-colors min-h-[44px] px-4"
            >
              Отправить ещё одну заявку
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App