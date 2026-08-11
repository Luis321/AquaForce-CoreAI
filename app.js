/* ================================================================
   AquaForce Training v3 — app.js
   AM/PM sessions · Gym · Pierna Hipertrofia · Meal Plan · SQLite
   ================================================================ */
'use strict';

// ════════════════════════════════════════════════════════════════
// 1. DAILY SCHEDULE — AM + PM por día
// ════════════════════════════════════════════════════════════════
const DAILY_SCHEDULE = {
  0: { // Domingo
    label: 'Domingo',
    am: {
      name: 'Aguas Abiertas',
      type: 'swim', location: 'OW',
      focus: 'Técnica · Patada · Orientación · Control',
      tags: ['natacion','recovery'], duration: '45–90 min', load: 'moderada',
      coach: 'Hoy el agua te enseña más que cualquier rutina en tierra. Foco en técnica, no en velocidad.',
      isSunday: true,
      exercises: [
        {id:'warmup-sw',   name:'Entrada al agua / Calentamiento', sets:1, reps:null, duration:'5 min',   rest:60,  note:'Aclimatarse a la temperatura. Movimientos suaves.'},
        {id:'kick-drill',  name:'Drill de patada',                  sets:3, reps:null, duration:'50 m',    rest:90,  note:'Solo piernas, tabla si tienes. Foco en la cadera, no solo pies.'},
        {id:'orientation', name:'Orientación en agua abierta',      sets:2, reps:null, duration:'100 m',   rest:120, note:'Levanta la cabeza cada 6–8 brazadas. Elige un punto de referencia.'},
        {id:'open-swim',   name:'Nado continuo libre',              sets:1, reps:null, duration:'20–40 min',rest:0,  note:'Ritmo cómodo. Escucha tu cuerpo.'},
        {id:'cooldown-sw', name:'Vuelta a la calma',                sets:1, reps:null, duration:'5 min',   rest:0,  note:'Nado suave, respiración lenta. Estira en tierra.'}
      ]
    },
    pm: null
  },
  1: { // Lunes
    label: 'Lunes',
    am: {
      name: 'Activación Matutina',
      type: 'home', location: 'Casa',
      focus: 'Movilidad + activación ligera · Sin carga, solo despertar el cuerpo',
      tags: ['recovery','core','natacion'], duration: '40 min', load: 'suave',
      coach: 'Rutina de activación — sin carga, solo para despertar el cuerpo antes del trabajo. Hoy no se trata de esfuerzo, se trata de consistencia.',
      exercises: [
        {id:'gato-vaca',    name:'Gato-Vaca',                       sets:2, reps:10,  duration:null,  rest:30, note:'Activa la columna. Inhala al bajar, exhala al subir.'},
        {id:'kegel',        name:'Kegel',                           sets:1, reps:12,  duration:null,  rest:20, note:'Core profundo para empezar el día.'},
        {id:'flow-am',      name:'Flow: side kick + crawl + hip twist + push-up', sets:2, reps:5, duration:null, rest:45, note:'Activación completa. Fluido, sin pausas entre los 4 movimientos.'},
        {id:'flutter',      name:'Flutter kicks',                   sets:3, reps:null, duration:'40s', rest:45, note:'Simula la patada de crol. Espalda baja pegada al suelo.'}
      ]
    },
    pm: null
  },
  2: { // Martes
    label: 'Martes',
    am: {
      name: 'Pierna Hipertrofia',
      type: 'home', location: 'Casa',
      focus: 'Fuerza de piernas para patada + volumen muscular',
      tags: ['pierna','core','natacion'], duration: '70 min', load: 'alta',
      coach: 'El día más importante de la semana. Cada rep de sentadilla se convierte en potencia en el agua — esta noche lo compruebas en la piscina.',
      exercises: [
        {id:'gato-vaca',    name:'Gato-Vaca',                       sets:2, reps:10,  duration:null,  rest:30,  note:'Activa la columna. Inhala al bajar, exhala al subir.'},
        {id:'kegel',        name:'Kegel',                           sets:1, reps:12,  duration:null,  rest:20,  note:'Core profundo antes de las cargas pesadas.'},
        {id:'flow-am',      name:'Flow: side kick + crawl + hip twist + push-up', sets:2, reps:5, duration:null, rest:45, note:'Activación completa. Fluido, sin pausas entre los 4 movimientos.'},
        {id:'sentadilla',   name:'Sentadilla con barra',            sets:4, reps:8,   duration:null,  rest:90,  note:'Tempo 3-1-1. Baja en 3 seg, pausa 1 seg, sube 1 seg explotando. Barra a 15 kg. Rodillas siguen la línea de los pies.', tempo:'3-1-1', isMain:true},
        {id:'zancada-b',    name:'Zancada trasera con barra',       sets:4, reps:10,  duration:null,  rest:75,  note:'10 reps por pierna. Rodilla trasera toca suelo. Torso erecto.', isMain:true},
        {id:'step-up',      name:'Step-up con mancuernas',          sets:3, reps:12,  duration:null,  rest:60,  note:'12 reps por pierna. Empuja desde el pie de arriba. Sin impulso abajo.', isMain:true},
        {id:'sq-sumo',      name:'Sentadilla sumo con mancuerna',   sets:3, reps:15,  duration:null,  rest:60,  note:'Pies más abiertos. Activa aductores y glúteo.'},
        {id:'rdl',          name:'Peso muerto rumano con barra',    sets:3, reps:10,  duration:null,  rest:75,  note:'Cadera atrás, espalda recta. Sientes el estiramiento en isquiotibiales.'},
        {id:'hip-bridge',   name:'Puente de glúteo con barra',      sets:3, reps:12,  duration:null,  rest:60,  note:'Apoya la barra sobre las caderas con toalla. Contrae glúteo arriba.'},
        {id:'flutter',      name:'Flutter kicks',                   sets:3, reps:null, duration:'40s', rest:45, note:'Simula la patada de crol. Espalda baja pegada al suelo.'}
      ]
    },
    pm: {
      name: 'Piscina — Técnica y Resistencia',
      type: 'swim', location: 'Piscina',
      focus: 'Técnica de nado · Resistencia aeróbica · Series',
      tags: ['natacion'], duration: '90 min', load: 'moderada',
      coach: 'Piernas cargadas desde la mañana. Ahora conviértelas en propulsión: técnica antes que velocidad.',
      exercises: [
        {id:'pool-warmup',  name:'Entrada y calentamiento',         sets:1, reps:null, duration:'10 min', rest:60, note:'Nado suave mixto. Aclimata el cuerpo después de la pierna de la mañana.'},
        {id:'pool-drill',   name:'Drills de técnica',               sets:4, reps:null, duration:'50 m',   rest:30, note:'Catch-up, dedos al costado, respiración bilateral. Calidad sobre velocidad.'},
        {id:'pool-main',    name:'Serie principal aeróbica',        sets:6, reps:null, duration:'100 m',  rest:45, note:'Ritmo constante. Las piernas se sienten pesadas — controla la patada.'},
        {id:'pool-kick',    name:'Patada final',                    sets:4, reps:null, duration:'25 m',   rest:60, note:'Solo piernas con tabla. Convierte la fuerza de la mañana en propulsión.'},
        {id:'pool-cooldown',name:'Vuelta a la calma',                sets:1, reps:null, duration:'5 min',  rest:0,  note:'Nado suave, respiración lenta. Estira en el borde.'}
      ]
    }
  },
  3: { // Miércoles
    label: 'Miércoles',
    am: {
      name: 'Activación Matutina',
      type: 'home', location: 'Casa',
      focus: 'Movilidad + activación ligera · Sin carga, solo despertar el cuerpo',
      tags: ['recovery','core','natacion'], duration: '40 min', load: 'suave',
      coach: 'Segunda sesión de activación de la semana. Después de la pierna del martes, hoy el cuerpo solo necesita movimiento suave.',
      exercises: [
        {id:'gato-vaca',    name:'Gato-Vaca',                       sets:2, reps:10,  duration:null,  rest:30, note:'Activa la columna. Inhala al bajar, exhala al subir.'},
        {id:'kegel',        name:'Kegel',                           sets:1, reps:12,  duration:null,  rest:20, note:'Core profundo para empezar el día.'},
        {id:'flow-am',      name:'Flow: side kick + crawl + hip twist + push-up', sets:2, reps:5, duration:null, rest:45, note:'Activación completa. Fluido, sin pausas entre los 4 movimientos.'},
        {id:'flutter',      name:'Flutter kicks',                   sets:3, reps:null, duration:'40s', rest:45, note:'Simula la patada de crol. Espalda baja pegada al suelo.'}
      ]
    },
    pm: null
  },
  4: { // Jueves
    label: 'Jueves',
    am: {
      name: 'Pierna Hipertrofia',
      type: 'home', location: 'Casa',
      focus: 'Segunda sesión de pierna · Progresión de carga semanal',
      tags: ['pierna','core','natacion'], duration: '70 min', load: 'alta',
      coach: 'Segunda pierna de la semana. Si el martes fue bueno, hoy sube 2.5 kg en sentadilla.',
      exercises: [
        {id:'gato-vaca',    name:'Gato-Vaca',                       sets:2, reps:10,  duration:null,  rest:30,  note:'Activa la columna antes del trabajo fuerte.'},
        {id:'kegel',        name:'Kegel',                           sets:1, reps:12,  duration:null,  rest:20,  note:'Core profundo antes de las cargas.'},
        {id:'flow-am',      name:'Flow: side kick + crawl + hip twist + push-up', sets:2, reps:5, duration:null, rest:45, note:'Activación completa. Fluido, sin pausas entre los 4 movimientos.'},
        {id:'sentadilla',   name:'Sentadilla con barra',            sets:4, reps:8,   duration:null,  rest:90,  note:'Mismo peso que el martes o +2.5 kg si completaste todas las reps. Tempo 3-1-1.', tempo:'3-1-1', isMain:true},
        {id:'zancada-b',    name:'Zancada trasera con barra',       sets:4, reps:10,  duration:null,  rest:75,  note:'10 reps por pierna. Controla la bajada.', isMain:true},
        {id:'step-up',      name:'Step-up con mancuernas',          sets:3, reps:12,  duration:null,  rest:60,  note:'12 reps por pierna. Progresa en peso si puedes.', isMain:true},
        {id:'sq-sumo',      name:'Sentadilla sumo',                 sets:3, reps:15,  duration:null,  rest:60,  note:'Aductores y glúteo. Peso moderado, recorrido completo.'},
        {id:'rdl',          name:'Peso muerto rumano',              sets:3, reps:10,  duration:null,  rest:75,  note:'Isquiotibiales y cadena posterior. Espalda neutra.'},
        {id:'hip-bridge',   name:'Puente de glúteo',                sets:3, reps:12,  duration:null,  rest:60,  note:'Contrae glúteo y mantén 1 seg arriba.'},
        {id:'flutter',      name:'Flutter kicks',                   sets:3, reps:null, duration:'40s', rest:45, note:'Termina siempre con el patrón de patada.'}
      ]
    },
    pm: {
      name: 'Piscina — Técnica y Resistencia',
      type: 'swim', location: 'Piscina',
      focus: 'Técnica de nado · Resistencia aeróbica · Series',
      tags: ['natacion'], duration: '90 min', load: 'moderada',
      coach: 'Última sesión fuerte de la semana. Nada con las piernas cansadas — así se construye resistencia real.',
      exercises: [
        {id:'pool-warmup',  name:'Entrada y calentamiento',         sets:1, reps:null, duration:'10 min', rest:60, note:'Nado suave mixto. Aclimata el cuerpo después de la pierna de la mañana.'},
        {id:'pool-drill',   name:'Drills de técnica',               sets:4, reps:null, duration:'50 m',   rest:30, note:'Catch-up, dedos al costado, respiración bilateral. Calidad sobre velocidad.'},
        {id:'pool-main',    name:'Serie principal aeróbica',        sets:6, reps:null, duration:'100 m',  rest:45, note:'Ritmo constante. Las piernas se sienten pesadas — controla la patada.'},
        {id:'pool-kick',    name:'Patada final',                    sets:4, reps:null, duration:'25 m',   rest:60, note:'Solo piernas con tabla. Convierte la fuerza de la mañana en propulsión.'},
        {id:'pool-cooldown',name:'Vuelta a la calma',                sets:1, reps:null, duration:'5 min',  rest:0,  note:'Nado suave, respiración lenta. Estira en el borde.'}
      ]
    }
  },
  5: { // Viernes
    label: 'Viernes',
    am: {
      name: 'Torso · Empuje',
      type: 'gym', location: 'Gym',
      focus: 'Pecho · Hombros · Tríceps · Físico de playa (después de las 6pm)',
      tags: ['gym','estabilidad'], duration: '70 min', load: 'alta',
      coach: 'Nueva rutina de torso y empuje, después de las 6pm. Si la semana fue muy exigente, cambia esta sesión por natación suave — escucha al cuerpo.',
      exercises: [
        {id:'hombro-circ',   name:'Círculos de hombro + rotación externa', sets:2, reps:10,  duration:null,  rest:20, note:'10 reps por lado. Movilidad completa antes de cargar.'},
        {id:'pushup-lento',  name:'Push-up lento sin peso',           sets:1, reps:8,   duration:null,  rest:30, note:'Bajada de 3-4 seg. Activa pecho y tríceps antes del press.'},
        {id:'press-banca-db',name:'Press banca con mancuernas (banco plano, sin rack)', sets:4, reps:8, duration:null, rest:90, note:'Tempo 3-1-1: baja 3 seg, pausa 1 seg, sube 1 seg explotando.', tempo:'3-1-1', isMain:true},
        {id:'press-mil-b',   name:'Press militar de pie con barra (clean desde el suelo)', sets:3, reps:10, duration:null, rest:75, note:'Clean la barra desde el suelo a los hombros, luego prensa. Core apretado.'},
        {id:'aperturas-db',  name:'Aperturas con mancuerna (banco plano)', sets:3, reps:12, duration:null, rest:75, note:'Codos con leve flexión fija. Baja hasta sentir estiramiento en el pecho.'},
        {id:'elev-lat-db',   name:'Elevaciones laterales con mancuerna', sets:3, reps:15,  duration:null,  rest:45, note:'Pesos moderados. Codos levemente flexionados. Sin impulso.'},
        {id:'fondos-banco',  name:'Fondos en banco',                 sets:3, reps:12,  duration:null,  rest:60, note:'Manos en el borde del banco. Baja hasta 90° en el codo.'},
        {id:'ext-triceps-db',name:'Extensión de tríceps con mancuerna', sets:3, reps:12, duration:null, rest:45, note:'Codos fijos junto a la cabeza. Baja controlado detrás de la nuca.'},
        {id:'face-pull-db',  name:'Face pull con mancuerna de pie (bisagra de cadera)', sets:3, reps:15, duration:null, rest:45, note:'Bisagra de cadera, jala hacia la cara separando las manos. Protege el hombro.'},
        {id:'kb-swing',      name:'Kettlebell swing',                sets:3, reps:15,  duration:null,  rest:60, note:'Empuje de cadera, no sentadilla. Core apretado, brazos relajados.'}
      ]
    },
    pm: null, pmNote: '✅ Sesión única después de las 6pm · Alternativa: natación suave'
  },
  6: { // Sábado
    label: 'Sábado',
    am: {
      name: 'Activación Suave (opcional)',
      type: 'home', location: 'Casa',
      focus: 'Movilidad + activación ligera · Descanso o movilidad opcional',
      tags: ['recovery','estabilidad'], duration: '15–20 min', load: 'suave',
      coach: 'Sábado es descanso. Si tienes energía, aprovecha el hueco de clases de 15 a 18h para 15-20 min de movilidad suave — nunca es obligatorio.',
      exercises: [
        {id:'gato-vaca',    name:'Gato-Vaca',                       sets:3, reps:10,  duration:null,   rest:20, note:'El más importante del día. Abre la columna.'},
        {id:'kegel',        name:'Kegel',                           sets:2, reps:12,  duration:null,   rest:20, note:'Core profundo, incluso en días suaves.'},
        {id:'flow-suave',   name:'Flow suave',                      sets:2, reps:4,   duration:null,   rest:30, note:'Sin explosividad. Movimiento fluido y consciente.'},
        {id:'plank-light',  name:'Plancha ligera',                  sets:2, reps:null, duration:'20s', rest:30, note:'Activa sin fatigar.'},
        {id:'serrato-s',    name:'Serrato suave',                   sets:2, reps:6,   duration:null,   rest:30, note:'Recuerda la protracción para mañana en el agua.'},
        {id:'flutter-s',    name:'Flutter kicks suave',             sets:2, reps:null, duration:'15s', rest:30, note:'Solo para recordar el patrón antes de nadar mañana.'}
      ]
    },
    pm: null, pmNote: '📚 Clases · Movilidad opcional en el hueco 15–18h'
  }
};

// ════════════════════════════════════════════════════════════════
// 2. MEAL PLAN DIARIO (revisado por nutricionista · insumos peruanos)
// ════════════════════════════════════════════════════════════════
const MEAL_PLAN = {
  1: { // Lunes — Activación
    kcal: 1898, type: 'activacion', prot: 174,
    whey: ['post'], whey_note: '1 scoop post-entreno, al terminar la activación de la mañana.',
    adjustment: 'Plan fijo ~1900 kcal — ya no baja en días de activación.',
    desayuno: '3 huevos enteros + 3 claras + avena cocida (60g) + canela',
    almuerzo: '180g tilapia a la plancha + 200g arroz integral + ensalada de brócoli + 1 cdta aceite de oliva + 30g palta',
    post_entreno: 'Whey (30g) + plátano + avena (15g) + leche + canela',
    cena: '150g pollo deshilachado + 100g arroz integral + ensalada verde + 25g palta + 150g yogur natural'
  },
  2: { // Martes — Pierna + Piscina
    kcal: 1902, type: 'doble', prot: 174,
    whey: ['post'], whey_note: '1 scoop post-entreno — tómalo después de la piscina (PM), cubre ambas sesiones del día.',
    adjustment: 'Un solo batido post-entreno para las dos sesiones (fuerza AM + piscina PM).',
    desayuno: '3 huevos enteros + 3 claras + avena cocida (60g) + ¼ tz arándanos',
    almuerzo: '180g jurel al horno + 200g camote sancochado + ensalada de espinaca + 1 cdta aceite + 30g palta',
    post_entreno: 'Whey (30g) + papaya + yogur natural + leche',
    cena: '150g tilapia al horno + 100g camote + ensalada de zapallito + 25g palta + 150g yogur natural'
  },
  3: { // Miércoles — Activación
    kcal: 1899, type: 'activacion', prot: 174,
    whey: ['post'], whey_note: '1 scoop post-entreno, al terminar la activación de la mañana.',
    adjustment: 'Plan fijo ~1900 kcal — ya no baja en días de activación.',
    desayuno: '3 huevos enteros + 3 claras + avena cocida (60g) + ½ plátano',
    almuerzo: '180g pollo a la plancha + 200g quinua cocida + ensalada de tomate/zapallito + 1 cdta aceite + 30g palta',
    post_entreno: 'Whey (30g) + plátano + avena (15g) + leche + canela',
    cena: '150g pollo a la plancha + 100g papa + ensalada de espinaca + 25g palta + 150g yogur natural'
  },
  4: { // Jueves — Pierna + Piscina (sube carga vs martes)
    kcal: 1904, type: 'doble', prot: 174,
    whey: ['post'], whey_note: '1 scoop post-entreno — tómalo después de la piscina (PM), cubre ambas sesiones del día.',
    adjustment: 'Un solo batido post-entreno para las dos sesiones. Día de mayor carga en pierna.',
    desayuno: '3 huevos enteros + 3 claras + avena cocida (60g) + 1 cdta semillas de girasol',
    almuerzo: '180g tilapia al horno + 200g papa sancochada + ensalada de brócoli + 1 cdta aceite + 30g palta',
    post_entreno: 'Whey (30g) + maracuyá + plátano + avena (15g) + leche',
    cena: '150g jurel al horno + 100g arroz integral + ensalada de brócoli + 25g palta + 150g yogur natural'
  },
  5: { // Viernes — Torso · Empuje (o natación alternativa)
    kcal: 1900, type: 'empuje', prot: 174,
    whey: ['post'], whey_note: '1 scoop post-entreno, al terminar Torso/Empuje después de las 6pm (o post-natación si eliges esa opción el viernes).',
    adjustment: 'Entrenamiento en la noche — sin carga extra en el desayuno.',
    desayuno: '3 huevos enteros + 3 claras + avena cocida (60g) + ¼ tz arándanos',
    almuerzo: '180g caballa a la plancha + 200g arroz integral + ensalada de espinaca/zanahoria + 1 cdta aceite + 30g palta',
    post_entreno: 'Whey (30g) + plátano + avena (15g) + leche + canela',
    cena: '150g pollo deshilachado + 100g camote + ensalada de tomate + 25g palta + 150g yogur natural'
  },
  6: { // Sábado — Descanso / movilidad opcional
    kcal: 1901, type: 'suave', prot: 174,
    whey: ['post'], whey_note: '1 scoop post-entreno o de mantenimiento.',
    adjustment: 'Día de mantenimiento antes de aguas abiertas del domingo.',
    desayuno: '3 huevos enteros + 3 claras + avena cocida (60g) + canela + ½ plátano',
    almuerzo: '180g carne magra (res) a la plancha + 200g camote + ensalada mixta + 1 cdta aceite + 30g palta',
    post_entreno: 'Whey (30g) + papaya + yogur natural + leche',
    cena: '150g tilapia a la plancha + 100g quinua + ensalada mixta + 25g palta + 150g yogur natural'
  },
  0: { // Domingo — Aguas abiertas
    kcal: 1897, type: 'natacion', prot: 174,
    whey: ['post'], whey_note: '1 scoop post-entreno, después de aguas abiertas.',
    adjustment: 'Agrega ½ plátano extra en el smoothie pre-entreno si sientes más hambre antes de nadar.',
    desayuno: '3 huevos enteros + 3 claras + avena cocida (60g) + fresas picadas',
    almuerzo: '180g tilapia a la plancha + 200g quinua + ensalada de tomate + 1 cdta aceite + 30g palta',
    post_entreno: 'Whey (30g) + plátano + avena (15g) + leche + canela',
    cena: '150g carne magra + 100g papa + ensalada verde + 25g palta + 150g yogur natural'
  }
};

// ════════════════════════════════════════════════════════════════
// 3. APP STATE
// ════════════════════════════════════════════════════════════════
const APP = {
  currentPage: 'home',
  currentTab: 'am',       // 'am' | 'pm' | 'nutrition'
  currentMode: 'normal',
  currentDayOfWeek: new Date().getDay(),
  completedExercises: { am: new Set(), pm: new Set() },
  exerciseWeights: {},
  mealCompleted: {},       // { 'desayuno': true, ... }
  db: null,
  dbReady: false,
  sessions: [],            // fallback array
  bodyMeasures: [],
  timerInterval: null,
  timerSeconds: 0,
  timerRunning: false,
  timerState: 'idle',
  currentExerciseIndex: 0,
  currentSeriesCount: 0,
  currentExercise: null,
  currentRoutineExercises: [],
  currentTimerSession: 'am',  // which session is being timed
  settings: {
    name: 'El usuario',
    goal: 'Funcional + agua + físico playa',
    mode: 'normal',
    dailyMinTarget: 35,
    dailySeriesTarget: 25
  },
  // ── CORE v3 ──────────────────────────────────────────────────
  core: {
    intentions: [],           // multi-select: ['calma','presencia',...]
    intention: '',            // legacy single (kept for compat)
    checkIn: null,            // {energia:1|2|3, ansiedad:1|2|3, claridad:1|2|3, sueno:number, date:''}
    journalToday: null,       // {date:'', q1:'', q2:'', q3:'', saved:false}
    guard: false,             // anti-overload guard active
    ritualChecks: {}          // {date:'', respiracion:bool, observacion:bool}
  }
};

let REST_TOTAL_SECS = 0;
let _lastRenderedExIds = '';

// ════════════════════════════════════════════════════════════════
// 4. SQLITE DATABASE
// ════════════════════════════════════════════════════════════════
async function initDB() {
  try {
    if (typeof initSqlJs === 'undefined') {
      APP.dbReady = false;
      return false;
    }
    const SQL = await initSqlJs({
      locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}`
    });
    const saved = localStorage.getItem('af_sqlite_v2');
    if (saved) {
      try {
        APP.db = new SQL.Database(new Uint8Array(JSON.parse(saved)));
      } catch {
        APP.db = new SQL.Database();
      }
    } else {
      APP.db = new SQL.Database();
    }
    createSchema();
    APP.dbReady = true;
    console.log('✅ SQLite ready');
    return true;
  } catch(e) {
    console.warn('SQLite init failed, using localStorage fallback:', e.message);
    APP.dbReady = false;
    return false;
  }
}

function saveDB() {
  if (!APP.db) return;
  try {
    const data = APP.db.export();
    localStorage.setItem('af_sqlite_v2', JSON.stringify(Array.from(data)));
  } catch(e) { console.warn('DB save error:', e); }
}

function createSchema() {
  APP.db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      session_type TEXT NOT NULL,
      routine_name TEXT,
      duration_min INTEGER DEFAULT 0,
      exercises_completed INTEGER DEFAULT 0,
      exercises_total INTEGER DEFAULT 0,
      series_completed INTEGER DEFAULT 0,
      energy INTEGER DEFAULT 0,
      score INTEGER DEFAULT 0,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE IF NOT EXISTS exercise_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER,
      exercise_id TEXT,
      exercise_name TEXT,
      sets_done INTEGER DEFAULT 0,
      reps_done INTEGER DEFAULT 0,
      weight_kg REAL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS exercise_weights (
      exercise_id TEXT PRIMARY KEY,
      weight_kg REAL DEFAULT 0,
      updated_at TEXT
    );
    CREATE TABLE IF NOT EXISTS body_measures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      pecho REAL, cintura REAL, cadera REAL, muslo REAL, peso REAL, notes TEXT
    );
    CREATE TABLE IF NOT EXISTS meal_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      meal_type TEXT,
      completed INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS morning_intentions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      intention TEXT,
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE IF NOT EXISTS check_ins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      energia INTEGER DEFAULT 0,
      ansiedad INTEGER DEFAULT 0,
      claridad INTEGER DEFAULT 0,
      sueno_horas REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE IF NOT EXISTS journal_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      q1 TEXT DEFAULT '',
      q2 TEXT DEFAULT '',
      q3 TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );
  `);
  saveDB();
}

const DB = {
  saveSession(s) {
    if (APP.db) {
      APP.db.run(
        `INSERT INTO sessions (date,session_type,routine_name,duration_min,
          exercises_completed,exercises_total,series_completed,energy,score,notes)
         VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [s.date, s.type, s.routineName, s.duration||0,
         s.exDone||0, s.exTotal||0, s.series||0, s.energy||3, s.score||0, s.notes||'']
      );
      const rows = APP.db.exec('SELECT last_insert_rowid()');
      const id = rows[0]?.values[0][0];
      saveDB();
      return id;
    }
    const session = {...s, id: 'ls_'+Date.now()};
    APP.sessions = APP.sessions.filter(x => !(x.date === s.date && x.type === s.type));
    APP.sessions.push(session);
    saveToStorage();
    return session.id;
  },

  getSessionsForDate(date) {
    if (APP.db) {
      const rows = APP.db.exec(
        `SELECT * FROM sessions WHERE date=? ORDER BY created_at DESC`, [date]
      );
      if (!rows[0]) return [];
      const cols = rows[0].columns;
      return rows[0].values.map(r => Object.fromEntries(cols.map((c,i) => [c,r[i]])));
    }
    return APP.sessions.filter(s => s.date === date)
      .map(s => ({...s, session_type: s.session_type || s.type || ''}));
  },

  getRecentSessions(n = 14) {
    if (APP.db) {
      const rows = APP.db.exec(
        `SELECT * FROM sessions ORDER BY date DESC, created_at DESC LIMIT ?`, [n]
      );
      if (!rows[0]) return [];
      const cols = rows[0].columns;
      return rows[0].values.map(r => Object.fromEntries(cols.map((c,i) => [c,r[i]])));
    }
    return [...APP.sessions].sort((a,b) => b.date.localeCompare(a.date)).slice(0, n)
      .map(s => ({...s, session_type: s.session_type || s.type || ''}));
  },

  saveWeight(exId, kg) {
    APP.exerciseWeights[exId] = kg;
    if (APP.db) {
      APP.db.run(
        `INSERT OR REPLACE INTO exercise_weights (exercise_id,weight_kg,updated_at)
         VALUES (?,?,datetime('now','localtime'))`, [exId, kg]
      );
      saveDB();
    }
    saveToStorage();
  },

  getWeight(exId) {
    return APP.exerciseWeights[exId] || 0;
  },

  loadWeights() {
    if (APP.db) {
      const rows = APP.db.exec(`SELECT exercise_id, weight_kg FROM exercise_weights`);
      if (rows[0]) {
        rows[0].values.forEach(([id, kg]) => { APP.exerciseWeights[id] = kg; });
      }
    }
  },

  saveBodyMeasure(m) {
    if (APP.db) {
      APP.db.run(
        `INSERT INTO body_measures (date,pecho,cintura,cadera,muslo,peso,notes)
         VALUES (?,?,?,?,?,?,?)`,
        [m.date, m.pecho||null, m.cintura||null, m.cadera||null,
         m.muslo||null, m.peso||null, m.notes||'']
      );
      saveDB();
    }
    APP.bodyMeasures.push({...m, id: Date.now()});
    saveToStorage();
  },

  getBodyMeasures() {
    if (APP.db) {
      const rows = APP.db.exec(
        `SELECT * FROM body_measures ORDER BY date DESC LIMIT 10`
      );
      if (!rows[0]) return [];
      const cols = rows[0].columns;
      return rows[0].values.map(r => Object.fromEntries(cols.map((c,i) => [c,r[i]])));
    }
    return [...APP.bodyMeasures].sort((a,b) => b.date.localeCompare(a.date)).slice(0,10);
  },

  saveMealLog(date, mealType, completed) {
    APP.mealCompleted[mealType] = completed;
    if (APP.db) {
      APP.db.run(
        `INSERT OR REPLACE INTO meal_logs (date,meal_type,completed) VALUES (?,?,?)`,
        [date, mealType, completed ? 1 : 0]
      );
      saveDB();
    }
    saveToStorage();
  },

  getMealLogsForDate(date) {
    if (APP.db) {
      const rows = APP.db.exec(
        `SELECT meal_type, completed FROM meal_logs WHERE date=?`, [date]
      );
      const result = {};
      if (rows[0]) rows[0].values.forEach(([t, c]) => { result[t] = !!c; });
      return result;
    }
    return APP.mealCompleted;
  },

  // ── CORE v3 methods ─────────────────────────────────────────
  saveIntention(date, intention) {
    if (APP.db) {
      APP.db.run(`INSERT OR REPLACE INTO morning_intentions (date, intention) VALUES (?,?)`,
        [date, intention]);
      saveDB();
    }
  },
  getTodayIntention(date) {
    if (!APP.db) return '';
    try {
      const r = APP.db.exec(`SELECT intention FROM morning_intentions WHERE date=? ORDER BY id DESC LIMIT 1`, [date]);
      return r[0]?.values[0]?.[0] || '';
    } catch(e){ return ''; }
  },
  saveCheckIn(date, energia, ansiedad, claridad, sueno) {
    if (APP.db) {
      APP.db.run(`INSERT OR REPLACE INTO check_ins (date,energia,ansiedad,claridad,sueno_horas) VALUES (?,?,?,?,?)`,
        [date, energia, ansiedad, claridad, sueno||0]);
      saveDB();
    }
  },
  getTodayCheckIn(date) {
    if (!APP.db) return null;
    try {
      const r = APP.db.exec(`SELECT energia,ansiedad,claridad,sueno_horas FROM check_ins WHERE date=? ORDER BY id DESC LIMIT 1`,[date]);
      if (!r[0]) return null;
      const [energia,ansiedad,claridad,sueno] = r[0].values[0];
      return {energia,ansiedad,claridad,sueno,date};
    } catch(e){ return null; }
  },
  getRecentCheckIns(n) {
    if (!APP.db) return [];
    try {
      const r = APP.db.exec(`SELECT date,energia,ansiedad,claridad,sueno_horas FROM check_ins ORDER BY date DESC LIMIT ?`,[n]);
      if (!r[0]) return [];
      return r[0].values.map(v => ({date:v[0],energia:v[1],ansiedad:v[2],claridad:v[3],sueno:v[4]}));
    } catch(e){ return []; }
  },
  saveJournalEntry(date, q1, q2, q3) {
    if (APP.db) {
      APP.db.run(`INSERT OR REPLACE INTO journal_entries (date,q1,q2,q3) VALUES (?,?,?,?)`,
        [date, q1||'', q2||'', q3||'']);
      saveDB();
    }
  },
  getTodayJournal(date) {
    if (!APP.db) return null;
    try {
      const r = APP.db.exec(`SELECT q1,q2,q3 FROM journal_entries WHERE date=? ORDER BY id DESC LIMIT 1`,[date]);
      if (!r[0]) return null;
      const [q1,q2,q3] = r[0].values[0];
      return {date,q1:q1||'',q2:q2||'',q3:q3||''};
    } catch(e){ return null; }
  },
  getJournalStreak() {
    if (!APP.db) return 0;
    try {
      const r = APP.db.exec(`SELECT DISTINCT date FROM journal_entries ORDER BY date DESC LIMIT 30`);
      if (!r[0]) return 0;
      const dates = r[0].values.map(v=>v[0]);
      let streak = 0;
      const today = getTodayKey();
      for (let i=0; i<dates.length; i++) {
        const expected = localDateKey(new Date(Date.now() - i*86400000));
        if (dates[i] === expected) streak++;
        else break;
      }
      return streak;
    } catch(e){ return 0; }
  },
    getStreakDates() {
    if (APP.db) {
      const rows = APP.db.exec(
        `SELECT DISTINCT date FROM sessions WHERE score > 0 ORDER BY date DESC LIMIT 30`
      );
      if (!rows[0]) return [];
      return rows[0].values.map(r => r[0]);
    }
    return [...new Set(APP.sessions.filter(s => s.score > 0).map(s => s.date))].sort().reverse();
  }
};

// ════════════════════════════════════════════════════════════════
// 5. STORAGE (localStorage fallback)
// ════════════════════════════════════════════════════════════════
function saveToStorage() {
  try {
    localStorage.setItem('af_sessions_v2',   JSON.stringify(APP.sessions));
    localStorage.setItem('af_settings_v2',   JSON.stringify(APP.settings));
    localStorage.setItem('af_weights_v2',    JSON.stringify(APP.exerciseWeights));
    localStorage.setItem('af_measures_v2',   JSON.stringify(APP.bodyMeasures));
    localStorage.setItem('af_meal_log',      JSON.stringify(APP.mealCompleted));
    localStorage.setItem('af_core_v3',       JSON.stringify(APP.core));
    localStorage.setItem('af_completed_v2',  JSON.stringify({
      date: getTodayKey(),
      am:   Array.from(APP.completedExercises.am),
      pm:   Array.from(APP.completedExercises.pm)
    }));
  } catch(e) { console.warn('Storage error:', e); }
}

function loadFromStorage() {
  try {
    const sessions = localStorage.getItem('af_sessions_v2');
    if (sessions) APP.sessions = JSON.parse(sessions);

    const settings = localStorage.getItem('af_settings_v2');
    if (settings) APP.settings = {...APP.settings, ...JSON.parse(settings)};

    const weights = localStorage.getItem('af_weights_v2');
    if (weights) APP.exerciseWeights = JSON.parse(weights);

    const measures = localStorage.getItem('af_measures_v2');
    if (measures) APP.bodyMeasures = JSON.parse(measures);

    const mealLog = localStorage.getItem('af_meal_log');
    const coreRaw = localStorage.getItem('af_core_v3');
    if (coreRaw) {
      try {
        const saved = JSON.parse(coreRaw);
        Object.assign(APP.core, saved);
        // Ensure intentions is array
        if (!Array.isArray(APP.core.intentions)) {
          APP.core.intentions = APP.core.intention ? APP.core.intention.split(',').filter(Boolean) : [];
        }
        // Ensure ritualChecks reset if new day
        if (APP.core.ritualChecks?.date !== getTodayKey()) {
          APP.core.ritualChecks = {date: getTodayKey()};
        }
      } catch(e){}
    }
    if (mealLog) APP.mealCompleted = JSON.parse(mealLog);

    const completed = localStorage.getItem('af_completed_v2');
    if (completed) {
      const parsed = JSON.parse(completed);
      if (parsed.date === getTodayKey()) {
        APP.completedExercises.am = new Set(parsed.am || []);
        APP.completedExercises.pm = new Set(parsed.pm || []);
      }
    }
  } catch(e) { console.warn('Load error:', e); }
}

// ════════════════════════════════════════════════════════════════
// 6. HELPERS
// ════════════════════════════════════════════════════════════════
function localDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function getTodayKey() { return localDateKey(new Date()); }

function getTodaySchedule() { return DAILY_SCHEDULE[APP.currentDayOfWeek]; }
function getTomorrowSchedule() { return DAILY_SCHEDULE[(APP.currentDayOfWeek + 1) % 7]; }
function getTodayMeals() { return MEAL_PLAN[APP.currentDayOfWeek]; }

function getModifiedExercises(exercises, mode) {
  if (!exercises) return [];
  return exercises.map(ex => {
    const e = {...ex};
    if (mode === 'ligero') {
      e.sets = Math.max(1, Math.ceil(ex.sets * 0.6));
      if (e.reps) e.reps = Math.max(5, Math.ceil(ex.reps * 0.7));
    } else if (mode === 'intenso') {
      e.sets = Math.ceil(ex.sets * 1.3);
      if (e.reps) e.reps = Math.ceil(ex.reps * 1.2);
    }
    return e;
  });
}

function formatDate(d) {
  const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
}
function formatTime(s) {
  return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}

function calculateScore(s) {
  const exRatio = s.exTotal > 0 ? s.exCompleted / s.exTotal : 0;
  let completion = exRatio >= 1 ? 35 : exRatio >= 0.8 ? 30 : exRatio >= 0.6 ? 22 : exRatio >= 0.4 ? 14 : exRatio > 0 ? 7 : 0;
  const sched    = DAILY_SCHEDULE[new Date().getDay()];
  const session  = s.type === 'AM' ? sched?.am : sched?.pm;
  const planned  = (session?.exercises || []).reduce((t, e) => t + (e.sets||0), 0);
  const volume   = Math.round(Math.min(1, planned > 0 ? s.series / planned : 0) * 25);
  const time     = Math.round(Math.min(1, s.duration / (APP.settings.dailyMinTarget||25)) * 20);
  const energy   = (s.energy||0) * 2;
  const streak   = getStreak();
  const consist  = streak >= 7 ? 10 : streak >= 5 ? 8 : streak >= 3 ? 5 : streak >= 1 ? 3 : 0;
  return Math.min(100, completion + volume + time + energy + consist);
}

function getScoreLabel(s) {
  return s >= 85 ? 'Excelente' : s >= 70 ? 'Bien completado' : s >= 50 ? 'Parcial' : s >= 25 ? 'Recovery' : 'No completado';
}
function getScoreColor(s) {
  return s >= 85 ? 'aqua' : s >= 70 ? 'green' : s >= 50 ? 'yellow' : s >= 25 ? 'orange' : 'red';
}
function getEnergyLabel(e) {
  return ['','Muy bajo','Bajo','Medio','Sólido','Fuerte'][e] || '—';
}

function getStreak() {
  const dates = DB.getStreakDates();
  if (!dates.length) return 0;
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (dates.includes(localDateKey(d))) streak++;
    else if (i > 0) break;
  }
  return streak;
}

function getWeekStats() {
  const today = new Date();
  const todayDow = today.getDay();
  let completed = 0, minutes = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - todayDow + i);
    const key = localDateKey(d);
    const sessions = DB.getSessionsForDate(key);
    if (sessions.length) {
      completed++;
      minutes += sessions.reduce((t, s) => t + (s.duration_min || s.duration || 0), 0);
    }
  }
  return { completed, minutes, total: APP.sessions.length };
}

function getTodaySessionsData() {
  return DB.getSessionsForDate(getTodayKey());
}

function getLast7Days() {
  const today = new Date();
  const labels = ['D','L','M','X','J','V','S'];
  return Array.from({length:7}, (_,i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i);
    const key = localDateKey(d);
    const sessions = DB.getSessionsForDate(key);
    const bestSession = sessions.reduce((b,s) => (s.score||0) > (b?.score||0) ? s : b, null);
    return { label: labels[d.getDay()], isToday: i===6, session: bestSession, key };
  });
}

function getWeekDots() {
  const today = new Date();
  const todayDow = today.getDay();
  return Array.from({length:7}, (_,i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - todayDow + i);
    const sessions = DB.getSessionsForDate(localDateKey(d));
    return { isToday: i === todayDow, done: sessions.some(s => s.score > 0) };
  });
}

function getWeeklyScore() {
  const today = new Date();
  const todayDow = today.getDay();
  let total = 0, count = 0, best = 0;
  for (let i = 0; i <= todayDow; i++) {
    const d = new Date(today); d.setDate(today.getDate() - todayDow + i);
    const sessions = DB.getSessionsForDate(localDateKey(d));
    sessions.forEach(s => {
      if (s.score > 0) { total += s.score; count++; best = Math.max(best, s.score); }
    });
  }
  return { avg: count > 0 ? Math.round(total/count) : 0, best, count };
}

function getPhrase(score) {
  if (score >= 85) return '"Hoy sumaste control, no solo volumen. Eso se nota en el agua."';
  if (score >= 70) return '"Buen trabajo: mantuviste técnica y constancia."';
  if (score >= 50) return '"La constancia está subiendo. Cada sesión cuenta."';
  if (score > 0)   return '"Hoy fue recovery. El descanso activo también entrena."';
  const streak = getStreak();
  if (streak > 3) return `"${streak} días seguidos. Tu racha habla por sí sola."`;
  return '"La constancia construye más que la intensidad. Muéstrate hoy."';
}

function getRecommendations() {
  const recs = [];
  const stats = getWeekStats();
  const streak = getStreak();
  const dow = APP.currentDayOfWeek;
  if (streak > 7) recs.push('Llevas '+streak+' días seguidos. Asegúrate de dormir 7h+ los días sin clase.');
  if (stats.completed >= 5) recs.push('Esta semana sube 2.5 kg en sentadilla si completaste todas las reps el martes y jueves.');
  if (dow === 2 || dow === 4) recs.push('Día de pierna + piscina: desayuno reforzado antes de la sentadilla y whey post-entreno en ambos bloques (AM fuerza y PM piscina).');
  if (dow === 1 || dow === 3) recs.push('Activación ligera hoy, sin carga. Día de mantenimiento — reduce carbohidratos frente a los días de pierna.');
  if (dow === 5) recs.push('Torso/Empuje después de las 6pm: ventana de proteína post-entreno al terminar la sesión.');
  if (dow === 6) recs.push('Descanso o movilidad opcional hoy. Día de mantenimiento.');
  if (dow === 0) recs.push('Aguas abiertas: día de entrenamiento largo. Mantén carbohidratos altos y whey post-natación.');
  if (!recs.length) recs.push('Mantén el volumen. Estás en zona de adaptación óptima.');
  return recs;
}

function calculateLoad(exercises, mode) {
  if (!exercises?.length) return 'suave';
  const sets = exercises.reduce((s, e) => s + (e.sets||0), 0);
  const avgRest = exercises.reduce((s, e) => s + (e.rest||60), 0) / exercises.length;
  let load = sets >= 22 || (sets >= 16 && avgRest <= 45) ? 'alta'
           : sets >= 13 || (sets >= 10 && avgRest <= 50) ? 'moderada' : 'suave';
  if (mode === 'intenso' && load !== 'alta')     load = load === 'suave' ? 'moderada' : 'alta';
  if (mode === 'ligero'  && load !== 'suave')    load = load === 'alta'  ? 'moderada' : 'suave';
  return load;
}
const LOAD_DESC = {
  suave:    'Sesión ligera: movilidad y activación. Perfecta para recuperar.',
  moderada: 'Carga equilibrada: fuerza + técnica. Tu zona de progreso.',
  alta:     'Sesión exigente: máximo volumen. Asegúrate de dormir y comer bien.'
};

// ════════════════════════════════════════════════════════════════
// 7. NAVIGATION
// ════════════════════════════════════════════════════════════════
function navigateTo(page) {
  stopTimer();
  document.getElementById('timer-modal').classList.add('hidden');
  document.getElementById('measures-modal').classList.add('hidden');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pageEl = document.getElementById('page-' + page);
  if (pageEl) pageEl.classList.add('active');
  const navEl = document.querySelector(`[data-page="${page}"]`);
  if (navEl) navEl.classList.add('active');
  APP.currentPage = page;
  if (page === 'home')      renderHome();
  if (page === 'today')     renderToday();
  if (page === 'dashboard') renderDashboard();
  if (page === 'exercises') renderExerciseLibrary();
  if (page === 'settings')  renderSettings();
  if (page === 'night')     renderNight();
  if (page === 'evolucion') renderEvolucion();
}

function switchTab(tab) {
  APP.currentTab = tab;
  document.querySelectorAll('.stab').forEach(b => {
    b.classList.remove('active-am','active-pm','active-nut');
    if (b.dataset.tab === tab) {
      if (tab === 'am')        b.classList.add('active-am');
      else if (tab === 'pm')   b.classList.add('active-pm');
      else                     b.classList.add('active-nut');
    }
  });
  renderTodayContent();
}

// ════════════════════════════════════════════════════════════════
// 8. HOME
// ════════════════════════════════════════════════════════════════
function renderHome() {
  const today     = new Date();
  const sched     = getTodaySchedule();
  const tomorrow  = getTomorrowSchedule();
  const stats     = getWeekStats();
  const streak    = getStreak();
  const todaySess = getTodaySessionsData();
  const amDone    = todaySess.some(s => s.session_type === 'AM' && s.score > 0);
  const pmDone    = todaySess.some(s => s.session_type === 'PM' && s.score > 0);

  document.getElementById('home-date').textContent    = formatDate(today);
  document.getElementById('home-streak').textContent  = streak;
  document.getElementById('stat-week-days').textContent   = stats.completed;
  document.getElementById('stat-week-min').textContent    = stats.minutes;
  document.getElementById('stat-total-sessions').textContent = stats.total;

  // AM card
  const amCard = document.getElementById('home-am-card');
  const amName = document.getElementById('home-am-name');
  const amMeta = document.getElementById('home-am-meta');
  const amBtn  = document.getElementById('btn-home-am');
  const amTags = document.getElementById('home-am-tags');
  if (sched?.am) {
    amName.textContent = sched.am.name;
    amMeta.textContent = sched.am.duration + ' · ' + (sched.am.exercises?.length||0) + ' ejerc.';
    amTags.innerHTML = sched.am.tags.map(t => `<span class="tag ${t}">${t}</span>`).join('');
    amBtn.textContent = amDone ? '✓ Completado' : '▶ Iniciar';
    amCard.style.opacity = '1';
  }

  // PM card
  const pmCard   = document.getElementById('home-pm-card');
  const pmName   = document.getElementById('home-pm-name');
  const pmMeta   = document.getElementById('home-pm-meta');
  const pmBtn    = document.getElementById('btn-home-pm');
  const pmNote   = document.getElementById('home-pm-note');
  const pmTags   = document.getElementById('home-pm-tags');
  if (sched?.pm) {
    pmCard.style.display = 'block';
    pmNote.style.display = 'none';
    pmName.textContent = sched.pm.name;
    pmMeta.textContent = sched.pm.duration + ' · ' + (sched.pm.exercises?.length||0) + ' ejerc.';
    pmTags.innerHTML = sched.pm.tags.map(t => `<span class="tag ${t}">${t}</span>`).join('');
    pmBtn.textContent = pmDone ? '✓ Completado' : '▶ Iniciar';
  } else {
    pmCard.style.display = 'none';
    pmNote.style.display = 'block';
    pmNote.textContent = sched?.pmNote || '✅ Sin sesión PM';
  }

  // Coach msg
  document.getElementById('home-coach').textContent = sched?.am?.coach || '';

  // Tomorrow
  const tom = tomorrow?.am || tomorrow?.pm;
  document.getElementById('tomorrow-name').textContent = `${tomorrow?.label} — ${tom?.name || 'Descanso'}`;
  document.getElementById('tomorrow-note').textContent = tomorrow?.am?.focus || '';

  // ── CORE v3: intention + state bar + guard + hombre4 ─────────
  renderCoreHomeElements();
}

// ════════════════════════════════════════════════════════════════
// 9. TODAY — 3 TABS
// ════════════════════════════════════════════════════════════════
function renderToday() {
  const sched = getTodaySchedule();
  const hasPM = !!sched?.pm;

  // Update tab labels
  const amTab  = document.getElementById('tab-am');
  const pmTab  = document.getElementById('tab-pm');
  const nutTab = document.getElementById('tab-nut');
  if (amTab) amTab.textContent = `☀️ AM · ${sched?.am?.duration || '—'}`;
  if (pmTab) {
    pmTab.textContent = hasPM ? `🌙 PM · ${sched?.pm?.duration || '—'}` : '🌙 PM';
    pmTab.style.opacity = hasPM ? '1' : '0.4';
  }

  _lastRenderedExIds = '';
  renderTodayContent();
}

function renderTodayContent() {
  const sched  = getTodaySchedule();
  const tab    = APP.currentTab;
  const content = document.getElementById('today-content');
  if (!content) return;

  if (tab === 'am') {
    renderSessionContent(sched?.am, 'am', content);
  } else if (tab === 'pm') {
    if (sched?.pm) renderSessionContent(sched.pm, 'pm', content);
    else {
      content.innerHTML = `
        <div style="text-align:center;padding:48px 24px">
          <div style="font-size:48px;margin-bottom:12px">🌙</div>
          <div style="font-family:var(--font-d);font-size:24px;font-weight:800;color:var(--text);margin-bottom:8px">${sched?.label || 'Hoy'}</div>
          <div style="font-family:var(--font-body);font-size:14px;color:var(--text3);line-height:1.5">${sched?.pmNote || 'Sin sesión PM este día'}</div>
        </div>`;
    }
  } else {
    renderNutritionContent(content);
  }
}

function renderSessionContent(session, type, container) {
  if (!session) return;
  const exercises = getModifiedExercises(session.exercises, APP.currentMode);
  if (type === 'am') APP.currentRoutineExercises = exercises;

  const completed = APP.completedExercises[type];
  const done = completed.size;
  const total = exercises.length;
  const pct = total > 0 ? Math.round((done/total)*100) : 0;
  const isGym  = session.type === 'gym';
  const isSunday = session.isSunday;
  const accent = type === 'pm' ? 'var(--orange)' : 'var(--aqua)';

  let html = `
    <div class="routine-header" style="${type==='pm' ? 'border-color:rgba(255,107,43,.2)' : ''}">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span class="session-pill ${type}">${type==='am'?'☀️ AM':'🌙 PM'}</span>
        <span style="font-family:var(--font-ui);font-size:10px;color:var(--text3)">${session.location || ''}</span>
      </div>
      <div class="routine-name">${session.name}</div>
      <div class="routine-goal">${session.focus}</div>
      <div class="tags" style="margin-bottom:12px">${session.tags.map(t=>`<span class="tag ${t}">${t}</span>`).join('')}</div>
  `;

  if (!isSunday) {
    html += `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <span class="section-title" style="margin:0">PROGRESO</span>
        <span style="font-family:var(--font-ui);font-size:12px;font-weight:700;color:${accent}">${done} / ${total}</span>
      </div>
      <div class="routine-progress">
        <div class="routine-progress-fill" id="progress-fill-${type}" style="width:${pct}%;${type==='pm'?'background:linear-gradient(90deg,var(--orange),var(--yellow));box-shadow:0 0 10px rgba(255,107,43,.4)':''}"></div>
      </div>
    `;
  }
  html += '</div>';

  if (isSunday) {
    html += `
      <div class="sunday-banner">
        <div class="sunday-icon">🌊</div>
        <div class="sunday-title">Aguas Abiertas</div>
        <div class="sunday-sub">${session.focus}</div>
        <div class="sunday-pillars">
          <span class="sunday-pillar">Adaptación</span>
          <span class="sunday-pillar">Técnica</span>
          <span class="sunday-pillar">Patada</span>
          <span class="sunday-pillar">Orientación</span>
        </div>
      </div>`;
  }

  exercises.forEach((ex, i) => {
    const isDone = completed.has(ex.id);
    const repStr = ex.reps ? `${ex.reps} reps` : (ex.duration || '');
    const weight = DB.getWeight(ex.id);
    const isMain = ex.isMain;
    html += `
      <div class="exercise-card stagger-item${isDone?' completed':''}${isMain?' main-ex':''}" id="ex-card-${type}-${ex.id}">
        <div class="ex-head">
          <div class="ex-name">
            <span class="ex-num">${String(i+1).padStart(2,'0')}</span>${ex.name}
          </div>
          <div class="ex-status">${isDone?'✓':''}</div>
        </div>
        <div class="chips">
          <span class="chip series ${type==='pm'?'pm':''}">${ex.sets} series</span>
          <span class="chip reps">${repStr}</span>
          ${ex.rest ? `<span class="chip rest">⏱ ${ex.rest}s</span>` : ''}
          ${ex.tempo ? `<span class="chip tempo">${ex.tempo}</span>` : ''}
          ${weight > 0 ? `<span class="chip weight">⚖ ${weight} kg</span>` : ''}
        </div>
        <div class="ex-note">${ex.note}</div>
        <div class="ex-actions">
          <button class="btn-start${type==='pm'?' pm-btn':''}" onclick="openTimerModal(${i},'${type}')">▶ Iniciar</button>
          <button class="btn-done" onclick="markExerciseDone('${ex.id}','${type}')">
            ${isDone ? '✓ Hecho' : 'Completado'}
          </button>
        </div>
      </div>`;
  });

  html += `
    <button class="btn btn-primary" style="${type==='pm'?'background:var(--orange);box-shadow:0 0 16px rgba(255,107,43,.3)':''};margin-top:8px"
      onclick="completeSession('${type}')">
      ✅ Finalizar sesión ${type.toUpperCase()}
    </button>`;

  container.innerHTML = html;
}

// ════════════════════════════════════════════════════════════════
// 10. NUTRITION TAB
// ════════════════════════════════════════════════════════════════
function renderNutritionContent(container) {
  const meals  = getTodayMeals();
  const sched  = getTodaySchedule();
  const mealLogs = DB.getMealLogsForDate(getTodayKey());
  if (!meals) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text3)">Sin plan de alimentación para hoy.</div>';
    return;
  }

  const TYPE_LABELS = {
    doble:      '⚡ Día Doble (Pierna + Piscina)',
    activacion: '🌿 Activación Ligera',
    empuje:     '💪 Torso · Empuje (PM)',
    natacion:   '🌊 Aguas Abiertas',
    suave:      '🌿 Activación Suave'
  };
  const TYPE_COLORS = {
    doble: 'var(--aqua)', activacion: 'var(--green)',
    empuje: 'var(--orange)',
    natacion: 'var(--aqua)', suave: 'var(--green)'
  };

  const mealItems = [
    { key: 'desayuno',     icon: '🥣', label: 'Desayuno',              sub: '≈420 kcal', content: meals.desayuno },
    { key: 'almuerzo',     icon: '🍱', label: 'Tupper 1 — Almuerzo',   sub: '≈490 kcal', content: meals.almuerzo },
    { key: 'post_entreno', icon: '🥤', label: 'Post-Entreno',          sub: '≈210 kcal', content: meals.post_entreno },
    { key: 'cena',         icon: '🍽️', label: 'Cena',                  sub: '≈280 kcal', content: meals.cena }
  ];

  let html = `
    <div style="background:linear-gradient(145deg,#0d1f35,#060c14);border-radius:var(--r2);border:1px solid var(--border);padding:16px;margin:0 0 14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span style="font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:2px;color:var(--text3);text-transform:uppercase">Hoy · ${sched?.label || ''}</span>
        <span style="font-family:var(--font-ui);font-size:11px;font-weight:700;color:${TYPE_COLORS[meals.type] || 'var(--aqua)'}">
          ${TYPE_LABELS[meals.type] || ''}
        </span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-family:var(--font-d);font-size:40px;font-weight:800;letter-spacing:-2px;color:var(--aqua);line-height:1">
            ${meals.kcal}
          </div>
          <div style="font-family:var(--font-ui);font-size:9px;font-weight:700;letter-spacing:2px;color:var(--text3);text-transform:uppercase">kcal objetivo</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-d);font-size:34px;font-weight:800;color:var(--orange);letter-spacing:-1px">${meals.prot}g</div>
          <div style="font-family:var(--font-ui);font-size:9px;font-weight:700;letter-spacing:2px;color:var(--text3);text-transform:uppercase">proteína objetivo</div>
        </div>
      </div>
      <div style="margin-top:10px;background:rgba(255,107,43,.08);border:1px solid rgba(255,107,43,.2);border-radius:8px;padding:8px 10px">
        <div style="font-family:var(--font-ui);font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--orange);text-transform:uppercase;margin-bottom:2px">Ajuste del día</div>
        <div style="font-family:var(--font-body);font-size:11px;color:var(--text2)">${meals.adjustment}</div>
      </div>
    </div>`;

  // Whey section
  if (meals.whey.length > 0) {
    const wheyPostDone = mealLogs['whey_post'];
    html += `
      <div style="background:rgba(11,255,240,.06);border:1px solid rgba(11,255,240,.2);border-radius:var(--r2);padding:14px;margin:0 0 14px">
        <div style="font-family:var(--font-ui);font-size:9px;font-weight:700;letter-spacing:2px;color:var(--aqua);text-transform:uppercase;margin-bottom:8px">🥤 WHEY HOY</div>
        ${meals.whey.includes('post') ? `
          <div class="meal-check-row" onclick="toggleMeal('whey_post')">
            <div class="meal-check-box${wheyPostDone?' checked':''}">✓</div>
            <div>
              <div style="font-family:var(--font-ui);font-size:13px;font-weight:700;color:var(--text)">Whey post-entreno · 1 scoop (30g)</div>
              <div style="font-family:var(--font-body);font-size:11px;color:var(--text3)">Con agua o leche, inmediatamente post-entreno</div>
            </div>
          </div>` : ''}
        <div style="font-family:var(--font-body);font-size:11px;color:var(--text3);margin-top:8px;font-style:italic">${meals.whey_note}</div>
      </div>`;
  }

  // Meal items
  mealItems.forEach(m => {
    const isDone = mealLogs[m.key];
    html += `
      <div class="meal-card${isDone?' meal-done':''}">
        <div class="meal-header" onclick="toggleMeal('${m.key}')">
          <div class="meal-check-box${isDone?' checked':''}">✓</div>
          <div style="flex:1">
            <div style="font-family:var(--font-ui);font-size:14px;font-weight:700;color:var(--text)">${m.icon} ${m.label}</div>
            <div style="font-family:var(--font-ui);font-size:9px;font-weight:600;letter-spacing:1px;color:var(--text3);text-transform:uppercase;margin-top:1px">${m.sub}</div>
          </div>
        </div>
        <div class="meal-body">${m.content.replace(/\n/g, '<br>')}</div>
      </div>`;
  });

  container.innerHTML = html;
}

function toggleMeal(type) {
  const current = APP.mealCompleted[type];
  const newVal = !current;
  APP.mealCompleted[type] = newVal;
  DB.saveMealLog(getTodayKey(), type, newVal);
  renderNutritionContent(document.getElementById('today-content'));
}

// ════════════════════════════════════════════════════════════════
// 11. EXERCISE CARD ACTIONS
// ════════════════════════════════════════════════════════════════
function markExerciseDone(exId, type = 'am') {
  const set = APP.completedExercises[type];
  if (set.has(exId)) set.delete(exId); else set.add(exId);
  saveToStorage();

  const card = document.getElementById(`ex-card-${type}-${exId}`);
  if (card) {
    const isDone = set.has(exId);
    card.className = `exercise-card stagger-item${isDone?' completed':''}`;
    const status = card.querySelector('.ex-status');
    if (status) status.textContent = isDone ? '✓' : '';
    const doneBtn = card.querySelector('.btn-done');
    if (doneBtn) doneBtn.textContent = isDone ? '✓ Hecho' : 'Completado';
  }

  // Update progress
  const sched   = getTodaySchedule();
  const session = type === 'am' ? sched?.am : sched?.pm;
  const exercises = getModifiedExercises(session?.exercises || [], APP.currentMode);
  const done    = set.size;
  const total   = exercises.length;
  const pct     = total > 0 ? Math.round((done/total)*100) : 0;
  const fillEl  = document.getElementById(`progress-fill-${type}`);
  if (fillEl) fillEl.style.width = pct + '%';

  if (set.has(exId)) showToast('✓ Completado', 'success');
}

function updateTodayProgress() {
  ['am','pm'].forEach(type => {
    const sched = getTodaySchedule();
    const session = type === 'am' ? sched?.am : sched?.pm;
    const exercises = getModifiedExercises(session?.exercises || [], APP.currentMode);
    const done = APP.completedExercises[type].size;
    const total = exercises.length;
    const pct = total > 0 ? Math.round((done/total)*100) : 0;
    const fillEl = document.getElementById(`progress-fill-${type}`);
    if (fillEl) fillEl.style.width = pct + '%';
  });
}

function completeSession(type) {
  const sched   = getTodaySchedule();
  const session = type === 'am' ? sched?.am : sched?.pm;
  if (!session) return;

  const exercises = getModifiedExercises(session.exercises || [], APP.currentMode);
  const exDone    = APP.completedExercises[type].size;
  const exTotal   = exercises.length;
  const plannedSeries = exercises.reduce((s, e) => s + e.sets, 0);
  const duration = parseInt(session.duration) || 25;

  const sessionData = {
    date:         getTodayKey(),
    type:         type.toUpperCase(),
    routineName:  session.name,
    duration,
    exDone,
    exTotal,
    series: Math.round(plannedSeries * (exDone / Math.max(exTotal, 1))),
    energy: 3,
    score:  0,
    notes:  ''
  };
  sessionData.score = calculateScore({
    type:        sessionData.type,
    exTotal:     sessionData.exTotal,
    exCompleted: sessionData.exDone,
    series:      sessionData.series,
    duration:    sessionData.duration,
    energy:      sessionData.energy
  });

  DB.saveSession(sessionData);
  showToast(`✅ Sesión ${type.toUpperCase()} guardada · Score: ${sessionData.score}`, 'success');
  navigateTo('evolucion');
}

function setTodayMode(mode) {
  APP.currentMode = mode;
  _lastRenderedExIds = '';
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  renderTodayContent();
}

// ════════════════════════════════════════════════════════════════
// 12. TIMER MODAL
// ════════════════════════════════════════════════════════════════
function stopTimer() {
  clearInterval(APP.timerInterval);
  APP.timerInterval = null;
  APP.timerRunning = false;
}

function openTimerModal(exerciseIndex, sessionType = 'am') {
  const sched   = getTodaySchedule();
  const session = sessionType === 'am' ? sched?.am : sched?.pm;
  const exercises = getModifiedExercises(session?.exercises || [], APP.currentMode);
  if (exerciseIndex >= exercises.length) return;

  stopTimer();
  APP.currentTimerSession    = sessionType;
  APP.currentExerciseIndex   = exerciseIndex;
  APP.currentExercise        = exercises[exerciseIndex];
  APP.currentRoutineExercises = exercises;
  APP.currentSeriesCount     = 0;
  APP.timerSeconds           = 0;
  APP.timerState             = 'idle';
  REST_TOTAL_SECS            = 0;

  // Style modal for AM/PM
  const modal = document.getElementById('timer-modal');
  modal.classList.remove('hidden');
  modal.classList.toggle('pm-modal', sessionType === 'pm');

  // Load saved weight
  const savedW = DB.getWeight(APP.currentExercise.id);
  const wInput = document.getElementById('modal-weight-input');
  if (wInput) {
    wInput.value = savedW || '';
    document.getElementById('modal-weight-hint').textContent =
      savedW > 0 ? `Último peso: ${savedW} kg ✓` : 'Sin registro previo';
  }

  updateTimerModal();
}

function updateTimerModal() {
  const ex  = APP.currentExercise;
  if (!ex) return;
  const exercises = APP.currentRoutineExercises;
  const idx = APP.currentExerciseIndex;
  const type = APP.currentTimerSession;

  document.getElementById('modal-ex-order').textContent  = `Ejercicio ${idx+1} de ${exercises.length}`;
  document.getElementById('modal-ex-name').textContent   = ex.name;
  const repStr = ex.reps ? `${ex.reps} reps` : (ex.duration || '');
  document.getElementById('modal-ex-target').textContent = `${ex.sets} series · ${repStr}`;
  document.getElementById('modal-rest-val').textContent  = ex.rest ? `${ex.rest}s` : '—';
  document.getElementById('modal-reps-val').textContent  = repStr;
  document.getElementById('modal-ex-progress').textContent = `${idx+1}/${exercises.length}`;

  // Note info button & popup — update content and session color, hide popup on exercise change
  const infoBtn   = document.getElementById('modal-ex-info-btn');
  const notePopup = document.getElementById('modal-ex-note-popup');
  const noteText  = document.getElementById('modal-ex-note-text');
  const hasNote   = !!(ex.note && ex.note.trim());
  if (infoBtn) {
    infoBtn.style.display = hasNote ? '' : 'none';
    infoBtn.className = `modal-ex-info-btn${type === 'pm' ? ' pm' : ''}`;
  }
  if (noteText)  noteText.textContent = ex.note || '';
  if (notePopup) notePopup.className  = `modal-ex-note-popup hidden${type === 'pm' ? ' pm' : ''}`;

  // Session badge
  const sessEl = document.getElementById('modal-session-badge');
  if (sessEl) {
    sessEl.className  = `session-pill ${type}`;
    sessEl.textContent = type === 'am' ? '☀️ AM' : '🌙 PM';
  }

  // Series circle
  const CIRC = 415;
  document.getElementById('series-current').textContent = APP.currentSeriesCount;
  document.getElementById('series-total').textContent   = ex.sets;
  const seriesPct = APP.currentSeriesCount / ex.sets;
  document.getElementById('series-fill').style.strokeDashoffset = CIRC - CIRC * seriesPct;

  // Timer circle
  document.getElementById('timer-display').textContent = formatTime(Math.max(0, APP.timerSeconds));
  const timerFill   = document.getElementById('timer-fill');
  const timerCircle = document.getElementById('timer-circle');
  const seriesCircle = document.getElementById('series-circle');
  timerCircle.classList.remove('is-working','is-resting');
  seriesCircle.classList.remove('is-working');

  if (['rest_running','rest_done'].includes(APP.timerState) && REST_TOTAL_SECS > 0) {
    const restPct = Math.max(0, APP.timerSeconds) / REST_TOTAL_SECS;
    timerFill.style.strokeDashoffset = CIRC - CIRC * restPct;
    timerFill.classList.replace('aqua','orange');
    timerCircle.classList.add('is-resting');
  } else {
    timerFill.style.strokeDashoffset = 0;
    timerFill.classList.replace('orange','aqua');
    if (APP.timerState === 'work') timerCircle.classList.add('is-working');
  }
  if (APP.timerState === 'work') seriesCircle.classList.add('is-working');

  // State badge
  const badge = document.getElementById('modal-state-badge');
  const STATES = {
    idle:         {cls:'work',  label:'LISTO',    pulse:false},
    work:         {cls:'work',  label:'TRABAJO',  pulse:true},
    rest_running: {cls:'rest',  label:'DESCANSO', pulse:true},
    rest_done:    {cls:'rest',  label:'¡LISTO!',  pulse:false},
    done:         {cls:'done',  label:'COMPLETADO',pulse:false}
  };
  const st = STATES[APP.timerState] || STATES.idle;
  badge.className = `state-badge ${st.cls}`;
  badge.innerHTML = `<div class="state-indicator"${st.pulse?'':' style="animation:none;opacity:.4"'}></div>${st.label}`;

  // Buttons
  const btnStart  = document.getElementById('modal-btn-start');
  const btnCompl  = document.getElementById('modal-btn-complete-set');
  const btnRest   = document.getElementById('modal-btn-rest');
  const isPM      = type === 'pm';

  btnStart.className = `btn btn-primary${isPM ? ' pm-btn' : ''}`;
  btnCompl.className = `btn btn-orange`;
  btnRest.disabled   = true;
  btnRest.textContent = '⏸ Iniciar descanso';

  if (APP.timerState === 'idle') {
    btnStart.textContent = '▶ Iniciar serie'; btnStart.disabled = false;
    btnCompl.disabled = true;
  } else if (APP.timerState === 'work') {
    btnStart.textContent = APP.timerRunning ? '⏸ Pausar' : '▶ Continuar'; btnStart.disabled = false;
    btnCompl.disabled = false;
  } else if (APP.timerState === 'rest_running') {
    btnStart.textContent = APP.timerRunning ? '⏸ Pausar descanso' : '▶ Continuar'; btnStart.disabled = false;
    btnCompl.disabled = true;
    btnRest.disabled = true; btnRest.textContent = '⏳ Descansando…';
  } else if (APP.timerState === 'rest_done') {
    btnStart.disabled = true; btnStart.textContent = '⏸ Pausar descanso';
    btnCompl.disabled = true;
    btnRest.disabled = false; btnRest.textContent = '✓ Completar descanso';
  } else if (APP.timerState === 'done') {
    btnStart.disabled = true; btnStart.textContent = '✓ Ejercicio listo';
    btnCompl.disabled = true;
  }
}

function startTimer() {
  if (APP.timerState === 'idle') {
    APP.timerState = 'work'; APP.timerSeconds = 0; _runWorkTimer();
  } else if (APP.timerState === 'work') {
    APP.timerRunning ? stopTimer() : _runWorkTimer();
  } else if (APP.timerState === 'rest_running') {
    APP.timerRunning ? stopTimer() : _runRestTimer();
  }
  updateTimerModal();
}

function _runWorkTimer() {
  stopTimer(); APP.timerRunning = true;
  APP.timerInterval = setInterval(() => {
    APP.timerSeconds++;
    document.getElementById('timer-display').textContent = formatTime(APP.timerSeconds);
  }, 1000);
}

function _runRestTimer() {
  stopTimer(); APP.timerRunning = true;
  APP.timerInterval = setInterval(() => {
    if (APP.timerSeconds <= 0) {
      stopTimer(); APP.timerSeconds = 0; APP.timerState = 'rest_done';
      showToast('⏰ ¡Descanso completado! Pulsa "Completar descanso"', 'success');
      updateTimerModal(); return;
    }
    APP.timerSeconds--;
    document.getElementById('timer-display').textContent = formatTime(Math.max(0, APP.timerSeconds));
    if (REST_TOTAL_SECS > 0) {
      const CIRC = 415;
      document.getElementById('timer-fill').style.strokeDashoffset = CIRC - CIRC * (APP.timerSeconds / REST_TOTAL_SECS);
    }
  }, 1000);
}

function resetTimer() {
  if (['rest_running','rest_done'].includes(APP.timerState)) return;
  stopTimer(); APP.timerSeconds = 0; APP.timerState = 'idle';
  document.getElementById('timer-display').textContent = '00:00';
  document.getElementById('timer-fill').style.strokeDashoffset = '0';
  updateTimerModal();
}

function completeSet() {
  if (APP.timerState !== 'work') return;
  stopTimer(); APP.currentSeriesCount++;

  // Weight auto-save
  const wInput = document.getElementById('modal-weight-input');
  const wVal = parseFloat(wInput?.value);
  if (wVal > 0) DB.saveWeight(APP.currentExercise.id, wVal);

  // Bump animation
  const numEl = document.getElementById('series-current');
  if (numEl) {
    numEl.classList.remove('series-bump'); void numEl.offsetWidth;
    numEl.classList.add('series-bump'); numEl.textContent = APP.currentSeriesCount;
  }
  const CIRC = 415;
  document.getElementById('series-fill').style.strokeDashoffset =
    CIRC - CIRC * (APP.currentSeriesCount / APP.currentExercise.sets);

  if (APP.currentSeriesCount >= APP.currentExercise.sets) {
    APP.timerState = 'done';
    markExerciseDone(APP.currentExercise.id, APP.currentTimerSession);
    showToast('🎯 ¡Ejercicio completado!', 'success');
  } else {
    const restSecs = APP.currentExercise.rest || 60;
    REST_TOTAL_SECS = restSecs; APP.timerSeconds = restSecs;
    APP.timerState  = 'rest_running';
    document.getElementById('timer-display').textContent = formatTime(restSecs);
    document.getElementById('timer-fill').classList.replace('aqua','orange');
    showToast(`Serie ${APP.currentSeriesCount}/${APP.currentExercise.sets} ✓ · Descansando ${restSecs}s`);
    _runRestTimer();
  }
  updateTimerModal();
}

function completeRest() {
  if (APP.timerState !== 'rest_done') return;
  stopTimer(); APP.timerSeconds = 0; REST_TOTAL_SECS = 0; APP.timerState = 'idle';
  const fill = document.getElementById('timer-fill');
  fill.style.strokeDashoffset = '0'; fill.classList.replace('orange','aqua');
  document.getElementById('timer-display').textContent = '00:00';
  showToast('▶ ¡A por la siguiente serie!', 'success');
  updateTimerModal();
}

function nextExercise() {
  stopTimer();
  const next = APP.currentExerciseIndex + 1;
  if (next < APP.currentRoutineExercises.length) openTimerModal(next, APP.currentTimerSession);
  else { document.getElementById('timer-modal').classList.add('hidden'); showToast('🎉 ¡Rutina completada!', 'success'); }
}

function closeTimerModal() {
  stopTimer(); document.getElementById('timer-modal').classList.add('hidden');
  _lastRenderedExIds = ''; renderTodayContent();
}

// ════════════════════════════════════════════════════════════════
// 13. DASHBOARD
// ════════════════════════════════════════════════════════════════
function setVal(id, text) {
  const el = document.getElementById(id); if (!el) return;
  if (el.textContent === String(text)) return;
  el.textContent = text;
  el.style.transition = 'none'; el.style.transform = 'scale(1.12)'; el.style.opacity = '0.5';
  requestAnimationFrame(() => {
    el.style.transition = 'transform .35s cubic-bezier(.34,1.56,.64,1), opacity .3s ease';
    el.style.transform = 'scale(1)'; el.style.opacity = '1';
  });
}
function setBar(id, pct) {
  const el = document.getElementById(id);
  if (el) el.style.width = Math.min(100, Math.max(0, pct)) + '%';
}

function renderDashboard() {
  try {
    const todaySessions = getTodaySessionsData();
    const amSess = todaySessions.find(s => s.session_type === 'AM');
    const pmSess = todaySessions.find(s => s.session_type === 'PM');
    const bestSess = todaySessions.reduce((b, s) => (s.score||0) > (b?.score||0) ? s : b, null);
    const score = bestSess?.score || 0;
    const streak = getStreak();
    const weekStats = getWeekStats();
    const weekScore = getWeeklyScore();
    const sched = getTodaySchedule();
    const amExs = getModifiedExercises(sched?.am?.exercises || [], APP.currentMode);
    const pmExs = getModifiedExercises(sched?.pm?.exercises || [], APP.currentMode);

    // Main score circle
    const CIRC = 578;
    const fill = document.getElementById('main-score-fill');
    if (fill) {
      fill.className = `fill ${getScoreColor(score)}`;
      fill.style.transition = 'none'; fill.style.strokeDashoffset = CIRC;
      requestAnimationFrame(() => {
        fill.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.22,.61,.36,1)';
        fill.style.strokeDashoffset = CIRC - CIRC * score / 100;
      });
    }
    const numEl = document.getElementById('main-score-num');
    if (numEl) { numEl.textContent = score > 0 ? score : '—'; numEl.style.color = `var(--${getScoreColor(score)})`; }
    const statusEl = document.getElementById('dash-score-status');
    if (statusEl) { statusEl.textContent = bestSess ? getScoreLabel(score) : 'Sin sesión aún'; statusEl.style.color = score > 0 ? `var(--${getScoreColor(score)})` : 'var(--aqua)'; }

    const section = document.getElementById('dash-score-section');
    if (section) section.className = `dash-score-section${score>=85?' score-high':score>=70?' score-good':score>=50?' score-med':score>0?' score-low':''}`;

    // Session scores row
    setVal('sc-am-score', amSess?.score || '—');
    setVal('sc-pm-score', pmSess?.score || '—');

    // Phrase
    const phraseEl = document.getElementById('dash-phrase');
    if (phraseEl) phraseEl.textContent = getPhrase(score);

    // Metrics
    const amMin = amSess?.duration_min || 0;
    const pmMin = pmSess?.duration_min || 0;
    const totalMin = amMin + pmMin;
    const targetMin = APP.settings.dailyMinTarget || 35;
    const timeNumEl = document.getElementById('dc-time-num');
    if (timeNumEl) setVal('dc-time-num', totalMin);
    const timeSubEl = document.getElementById('dc-time-sub');
    if (timeSubEl) timeSubEl.textContent = `de ${targetMin} min meta`;
    setTimeout(() => setBar('dc-time-bar', (totalMin / targetMin) * 100), 120);

    const plannedSets = [...amExs, ...pmExs].reduce((s,e) => s + (e.sets||0), 0);
    const doneSeries  = (amSess?.series_completed||0) + (pmSess?.series_completed||0);
    setVal('dc-series', doneSeries);
    const seriesSubEl = document.getElementById('dc-series-sub');
    if (seriesSubEl) seriesSubEl.textContent = `de ${plannedSets} planificadas`;
    setTimeout(() => setBar('dc-series-bar', plannedSets > 0 ? (doneSeries/plannedSets)*100 : 0), 160);

    const amDone = amSess?.exercises_completed || 0;
    const pmDone = pmSess?.exercises_completed || 0;
    const amTotal = amExs.length; const pmTotal = pmExs.length;
    setVal('dc-exercises', amDone + pmDone);
    const exSubEl = document.getElementById('dc-exercises-sub');
    if (exSubEl) exSubEl.textContent = `de ${amTotal + pmTotal} planificados`;
    setTimeout(() => setBar('dc-exercises-bar', (amTotal+pmTotal) > 0 ? ((amDone+pmDone)/(amTotal+pmTotal))*100 : 0), 200);

    // Carga
    const load = calculateLoad([...amExs, ...pmExs], APP.currentMode);
    ['suave','moderada','alta'].forEach(c => {
      const el = document.getElementById('carga-'+c);
      if (el) el.className = `carga-pill ${c}${load===c?' active':''}`;
    });
    const cdEl = document.getElementById('carga-detail');
    if (cdEl) cdEl.textContent = LOAD_DESC[load];

    // Nutrition progress
    const meals = getTodayMeals();
    if (meals) {
      const mealLogs = DB.getMealLogsForDate(getTodayKey());
      const keys = ['desayuno','almuerzo','post_entreno','cena',...meals.whey.map(w=>`whey_${w}`)];
      const done = keys.filter(k => mealLogs[k]).length;
      setVal('dc-meal-pct', Math.round((done/keys.length)*100) + '%');
      setBar('dc-meal-bar', (done/keys.length)*100);
      const mealSubEl = document.getElementById('dc-meal-sub');
      if (mealSubEl) mealSubEl.textContent = `${done} de ${keys.length} comidas ✓`;
    }

    // Streak & week
    setVal('dc-streak', streak);
    const wlEl = document.getElementById('dc-week-label');
    if (wlEl) wlEl.textContent = `Esta semana: ${weekStats.completed}/7 días`;
    const wdEl = document.getElementById('dc-week-dots');
    if (wdEl) wdEl.innerHTML = getWeekDots().map(d =>
      `<div class="week-dot${d.done?' done':''}${d.isToday?' today':''}"></div>`).join('');

    // Weekly score
    setVal('dc-week-score', weekScore.avg || '—');
    setVal('dc-week-best', weekScore.best || '—');

    // 7-day history
    const ICONS = {AM:'🏠', PM:'🏋️', OW:'🌊'};
    const histEl = document.getElementById('dc-history');
    if (histEl) {
      histEl.innerHTML = getLast7Days().map(day => {
        const s = day.session;
        const sc = s ? Math.min(100, Math.max(0, s.score||0)) : 0;
        return `<div class="history-day${s?' done':''}${day.isToday?' today':''}" style="--score-pct:${sc}%;--score-color:var(--${s?getScoreColor(sc):'text3'})">
          <div class="hd-day">${day.label}</div>
          <div class="hd-icon">${s ? (ICONS[s.session_type]||'🏠') : '·'}</div>
          <div class="hd-score">${s && sc > 0 ? sc : '—'}</div>
        </div>`;
      }).join('');
    }

    // Recommendations
    const recsEl = document.getElementById('dc-recs');
    if (recsEl) recsEl.innerHTML = getRecommendations().map(r =>
      `<div class="rec-item"><span class="rec-arrow">→</span>${r}</div>`).join('');

  } catch(e) { console.error('[Dashboard]', e); }
}

// ════════════════════════════════════════════════════════════════
// 14. EXERCISE LIBRARY
// ════════════════════════════════════════════════════════════════
const EXERCISE_LIBRARY = [
  {id:'gato-vaca',   name:'Gato-Vaca',categories:['recovery','core'],objetivo:'Movilizar columna, activar core profundo y respiración.',musculos:'Erectores espinales, transverso abdominal',tecnica:'Cuadrupedia: alterna gato (espalda redonda) y vaca (extensión). Coordina con respiración.',errores:'Moverse solo en lumbar, no sincronizar respiración.',dificultad:1,variantes:{facil:'Solo cadera, sin zona cervical.',media:'Pausa 2s en cada extremo.',avanzado:'Carga pequeña en espalda.'},natacion:'Activa ondulación de cadera para mariposa y posición de crol.'},
  {id:'sentadilla',  name:'Sentadilla con barra',categories:['pierna'],objetivo:'Fuerza global de piernas, hipertrofia cuádriceps y glúteos.',musculos:'Cuádriceps, glúteo mayor, isquiotibiales, core',tecnica:'Pies a ancho de hombros. Baja con tempo 3-1-1: 3 seg bajando, 1 pausa, 1 subiendo. Profundidad mínima: muslos paralelos.',errores:'Valgo de rodillas, talones levantados, espalda redondeada.',dificultad:3,variantes:{facil:'Sentadilla con silla.',media:'Sentadilla libre con barra.',avanzado:'Sentadilla búlgara o pistol squat.'},natacion:'Cadena cinética completa de la pierna. Potencia de patada y posición de cadera en el agua.'},
  {id:'zancada-b',   name:'Zancada trasera con barra',categories:['pierna','core'],objetivo:'Fuerza unilateral de pierna con estabilidad.',musculos:'Cuádriceps, glúteo mayor, isquiotibiales, core',tecnica:'Paso largo atrás. Rodilla trasera casi toca el suelo. Torso erecto todo el movimiento.',errores:'Rodilla delantera pasa el pie, tronco inclinado.',dificultad:2,variantes:{facil:'Sin barra, manos en cadera.',media:'Con barra sin carga.',avanzado:'Con peso en barra + step para mayor rango.'},natacion:'Cadena posterior de pierna, directamente en la patada de crol.'},
  {id:'step-up',     name:'Step-up con mancuernas',categories:['pierna','estabilidad'],objetivo:'Fuerza unilateral y equilibrio de cadera.',musculos:'Cuádriceps, glúteos, isquiotibiales',tecnica:'Un pie sobre el banco. Empuja desde ese pie. Rodilla sube a 90°. Baja controlado.',errores:'Impulso del pie de abajo, rodilla cae hacia adentro.',dificultad:2,variantes:{facil:'Altura baja (20 cm).',media:'Altura 40 cm con control.',avanzado:'Mancuernas + pausa 2s arriba.'},natacion:'Imita el rango de la patada de delfín.'},
  {id:'rdl',         name:'Peso muerto rumano',categories:['pierna'],objetivo:'Isquiotibiales y cadena posterior para completar el ciclo de patada.',musculos:'Isquiotibiales, glúteo mayor, erectores espinales',tecnica:'Cadera atrás, espalda neutra. Baja la barra por las piernas hasta sentir estiramiento en isquios.',errores:'Redondear la espalda, flexionar demasiado las rodillas.',dificultad:2,variantes:{facil:'Solo con mancuernas.',media:'Con barra.',avanzado:'En una sola pierna.'},natacion:'Cadena posterior: complementa la fase de recuperación de la patada.'},
  {id:'hip-bridge',  name:'Puente de glúteo con barra',categories:['pierna'],objetivo:'Glúteo mayor y fuerza de cadera para la extensión en patada.',musculos:'Glúteo mayor, isquiotibiales, core',tecnica:'Espalda apoyada en banco, barra sobre caderas con toalla. Sube contrayendo glúteo, pausa 1 seg, baja controlado.',errores:'Usar la espalda en lugar del glúteo, no completar extensión.',dificultad:2,variantes:{facil:'Sin barra, solo con peso corporal.',media:'Con barra.',avanzado:'Una sola pierna con barra.'},natacion:'El glúteo es el motor de la patada de crol. Fortalecerlo mejora directamente la propulsión.'},
  {id:'flutter',     name:'Flutter kicks',categories:['pierna','core','natacion'],objetivo:'Replicar en tierra la patada de crol. Fortalecer cadera y core.',musculos:'Flexores de cadera, recto femoral, core',tecnica:'Tumbado, espalda baja pegada al suelo. Piernas extendidas a 20-30 cm. Movimiento alternado con tobillo activo.',errores:'Lumbar despegada, rodillas flexionadas, pies demasiado altos.',dificultad:2,variantes:{facil:'15 seg, piernas más altas.',media:'30 seg, piernas bajas.',avanzado:'45 seg + brazos sobre la cabeza.'},natacion:'Transferencia directa. Es literalmente el entrenamiento en tierra de la patada de crol.'},
  {id:'halo',        name:'Halo con mancuerna',categories:['estabilidad','funcional'],objetivo:'Activar serrato anterior, deltoides y mejorar movilidad de hombro.',musculos:'Serrato anterior, deltoides, trapecio, core oblicuo',tecnica:'Mancuerna con ambas manos. Swing lateral + halo completo alrededor de la cabeza. Codos semiflexionados.',errores:'Codos extendidos, perder control sobre la cabeza.',dificultad:2,variantes:{facil:'Solo halo sin swing.',media:'Swing + halo completo.',avanzado:'De pie sobre una pierna.'},natacion:'El serrato anterior es clave en la brazada larga de crol.'},
  {id:'plank-sh',    name:'Plank shoulder taps',categories:['core','estabilidad'],objetivo:'Estabilidad anti-rotacional del core y fuerza de hombros.',musculos:'Transverso abdominal, oblicuos, deltoides, serrato',tecnica:'Plank en manos. Sin rotar la cadera, lleva una mano al hombro contrario. Alterna.',errores:'Rotar o elevar la cadera, colapsar los hombros.',dificultad:2,variantes:{facil:'Pies separados.',media:'Pies juntos, cadencia lenta.',avanzado:'Peso en muñeca.'},natacion:'Anti-rotación: evita desperdiciar energía en movimientos laterales del torso.'},
  {id:'serrato-b',   name:'Serrato en barra',categories:['barra','estabilidad','natacion'],objetivo:'Fortalecer el serrato anterior, el músculo de la brazada larga.',musculos:'Serrato anterior, trapecio inferior, romboides',tecnica:'Colgado, sin doblar codos: protracción + depresión de escápulas. Mantén 2 seg.',errores:'Doblar codos (se convierte en dominada), encogerse de hombros.',dificultad:2,variantes:{facil:'Solo bajada de escápulas.',media:'Protracción completa con pausa.',avanzado:'Rotación de pelvis al final.'},natacion:'El serrato es responsable del 30-40% de la potencia de brazada.'},
  {id:'pushup-b',    name:'Push-up en barra',categories:['barra','estabilidad'],objetivo:'Fuerza de empuje con énfasis en serrato anterior.',musculos:'Pectoral, tríceps, serrato anterior, deltoides, core',tecnica:'Con la barra, baja el pecho en 3 seg. Codos a 45°. Al subir, protracción de escápulas al final.',errores:'Codos a 90°, no completar protracción.',dificultad:2,variantes:{facil:'Push-up de rodillas.',media:'Push-up completo.',avanzado:'Pausa 2s abajo + protracción exagerada.'},natacion:'La protracción activa el serrato que usas en la tracción de la brazada.'},
  {id:'elev-piernas',name:'Elevaciones de piernas en barra',categories:['barra','core','natacion'],objetivo:'Core con énfasis en flexores de cadera. Patrón vertical de patada.',musculos:'Recto abdominal, iliopsoas, oblicuos',tecnica:'Colgado de barra. Eleva piernas manteniendo tensión abdominal. Empieza con rodillas, progresa a piernas rectas.',errores:'Balancear, no controlar la bajada.',dificultad:3,variantes:{facil:'Elevación de rodillas.',media:'Piernas a 45°.',avanzado:'Piernas rectas a 90° + rotación de pelvis.'},natacion:'Entrenamiento del core vertical para la patada de mariposa y posición horizontal en el agua.'},
  {id:'press-banca',  name:'Press banca con barra',categories:['gym'],objetivo:'Fuerza y volumen de pecho para el físico atlético.',musculos:'Pectoral mayor, tríceps, deltoides anterior',tecnica:'Codos a 45°. Baja la barra hasta tocar el pecho. Sube explotando. Core activo en el banco.',errores:'Codos a 90°, no tocar el pecho, arquear excesivamente.',dificultad:2,variantes:{facil:'Press con mancuernas.',media:'Press banca con barra.',avanzado:'Pausa 2s en el pecho.'},natacion:'Fuerza de empuje que complementa la brazada de braza.'},
  {id:'press-mil',   name:'Press militar',categories:['gym','estabilidad'],objetivo:'Volumen de hombros. Clave para el físico de nadador.',musculos:'Deltoides (las 3 cabezas), tríceps, trapecio',tecnica:'De pie o sentado. Barra a nivel de clavícula. Sube directo, pasa por delante de la cara. Core activo.',errores:'Arquear la espalda, codos demasiado adelante.',dificultad:2,variantes:{facil:'Press con mancuernas sentado.',media:'Press militar con barra.',avanzado:'Push press con impulso de piernas.'},natacion:'Los hombros fuertes protegen la articulación durante miles de brazadas.'},
  {id:'elev-lat',    name:'Elevaciones laterales',categories:['gym'],objetivo:'Ancho de hombros. Lo que más se nota visualmente.',musculos:'Deltoides medial, supraespinoso',tecnica:'Pesos moderados. Eleva los brazos lateralmente hasta la altura del hombro. Codos levemente flexionados.',errores:'Impulso del cuerpo, pesos demasiado altos, encogerse de hombros.',dificultad:1,variantes:{facil:'Con bandas elásticas.',media:'Con mancuernas.',avanzado:'Cable lateral raise.'},natacion:'Deltoides medial: fundamental en la recuperación del brazo en crol.'},
  {id:'fondos',      name:'Fondos en paralelas',categories:['gym'],objetivo:'Tríceps y pecho inferior.',musculos:'Tríceps, pectoral inferior, deltoides anterior',tecnica:'Inclínate levemente adelante para pecho. Baja hasta 90°. Codos cerca del cuerpo para tríceps.',errores:'No bajar suficiente, codos demasiado abiertos.',dificultad:3,variantes:{facil:'Fondos en banco.',media:'Fondos en paralelas sin lastre.',avanzado:'Fondos con lastre.'},natacion:'Tríceps potente: mejora la fase de empuje de la brazada.'},
  {id:'jalon',       name:'Jalón al pecho agarre ancho',categories:['gym','natacion'],objetivo:'Espalda ancha en V. Latísimo dorsal.',musculos:'Latísimo dorsal, bíceps, romboides, trapecio inferior',tecnica:'Agarre más ancho que hombros. Baja a la clavícula. Escápulas abajo y atrás al final. No jalar por detrás del cuello.',errores:'Codos adelante, no activar escápulas, demasiado peso.',dificultad:2,variantes:{facil:'Jalón con agarre neutro.',media:'Jalón al pecho agarre ancho.',avanzado:'Dominadas libres.'},natacion:'El latísimo es el motor principal de la brazada. El jalón es el mejor ejercicio de gym para natación.'},
  {id:'remo-pol',    name:'Remo en polea sentado',categories:['gym'],objetivo:'Grosor de espalda y retractores de escápula.',musculos:'Romboides, trapecio medio, bíceps, dorsal',tecnica:'Sentado, espalda recta. Jala hacia el ombligo. Escápulas atrás al final. Controla la vuelta.',errores:'Redondear la espalda, usar impulso del torso.',dificultad:2,variantes:{facil:'Remo con mancuerna.',media:'Remo en polea.',avanzado:'Remo con barra inclinado.'},natacion:'Escápulas fuertes protegen los hombros y mejoran la posición de brazada.'},
  {id:'dominadas',   name:'Dominadas asistidas o libres',categories:['barra','gym','natacion'],objetivo:'El mejor ejercicio de espalda. Transferencia directa al agua.',musculos:'Latísimo dorsal, bíceps, romboides, serrato',tecnica:'Agarre supino o prono. Baja completamente. Sube controlado activando el dorsal.',errores:'No bajar completo, usar impulso, no activar el dorsal.',dificultad:3,variantes:{facil:'Jalón en máquina.',media:'Dominadas asistidas.',avanzado:'Dominadas con lastre.'},natacion:'Las dominadas replican exactamente el patrón de la brazada. Cada dominada es una brazada más potente.'},
  {id:'curl-alt',    name:'Curl bíceps alterno',categories:['gym'],objetivo:'Fuerza de bíceps para la tracción en agua.',musculos:'Bíceps braquial, braquial',tecnica:'Codo fijo. Supinación completa al subir. Controla la bajada.',errores:'Balancear el cuerpo, no supinar completamente.',dificultad:1,variantes:{facil:'Curl con banda.',media:'Curl alterno.',avanzado:'Curl inclinado en banco.'},natacion:'Bíceps en la fase de tracción de la brazada.'},
  {id:'face-pull',   name:'Face pull en polea',categories:['gym','estabilidad'],objetivo:'Salud de hombros. Rotadores externos y trapecio.',musculos:'Deltoides posterior, infraespinoso, trapecio',tecnica:'Polea alta. Jala hacia la cara separando las manos al final. Codos arriba.',errores:'Jalar demasiado pesado, bajar los codos.',dificultad:1,variantes:{facil:'Con banda elástica.',media:'Con polea.',avanzado:'Con pausa 2s al final.'},natacion:'Protege el manguito rotador, fundamental para nadar sin lesiones.'}
];

let activeFilter = 'all', searchQuery = '';
function renderExerciseLibrary() {
  const q   = searchQuery.toLowerCase();
  const list = EXERCISE_LIBRARY.filter(ex => {
    const mf = activeFilter === 'all' || ex.categories.includes(activeFilter);
    const ms = !q || ex.name.toLowerCase().includes(q) || ex.objetivo.toLowerCase().includes(q);
    return mf && ms;
  });
  const container = document.getElementById('exercise-library-list');
  if (!container) return;
  if (!list.length) { container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text3)">Sin resultados.</div>'; return; }
  container.innerHTML = list.map(ex => `
    <div class="ex-library-card">
      <div class="elc-name">${ex.name}</div>
      <div class="elc-cats">${ex.categories.map(c=>`<span class="tag ${c}">${c}</span>`).join('')}</div>
      <div class="elc-obj">${ex.objetivo}</div>
      <div class="elc-muscles">💪 ${ex.musculos}</div>
      <button class="btn btn-ghost btn-sm" style="margin-top:8px" onclick="toggleExDetail('${ex.id}')">Ver detalles ↓</button>
      <div class="elc-details" id="detail-${ex.id}">
        <div class="elc-detail-section"><h4>Técnica correcta</h4><p>${ex.tecnica}</p></div>
        <div class="elc-detail-section"><h4>Errores comunes</h4><p>${ex.errores}</p></div>
        <div class="variantes">
          <div class="variante facil"><div class="v-level">🟢 Fácil</div><p>${ex.variantes.facil}</p></div>
          <div class="variante media"><div class="v-level">🟡 Media</div><p>${ex.variantes.media}</p></div>
          <div class="variante avanzado"><div class="v-level">🔴 Avanzado</div><p>${ex.variantes.avanzado}</p></div>
        </div>
        ${ex.natacion?`<div class="natacion-tag"><div style="font-family:var(--font-ui);font-size:9px;font-weight:700;letter-spacing:2px;color:var(--aqua);margin-bottom:3px">🌊 TRANSFERENCIA A NATACIÓN</div><p>${ex.natacion}</p></div>`:''}
      </div>
    </div>`).join('');
}
function toggleExDetail(id) {
  const d = document.getElementById('detail-'+id); if (!d) return;
  const open = d.classList.toggle('open');
  const btn = d.previousElementSibling; if (btn) btn.textContent = open ? 'Ocultar ↑' : 'Ver detalles ↓';
}

// ════════════════════════════════════════════════════════════════
// 15. SETTINGS
// ════════════════════════════════════════════════════════════════
function renderSettings() {
  const n = document.getElementById('cfg-name'); if (n) n.value = APP.settings.name;
  const g = document.getElementById('cfg-goal'); if (g) g.value = APP.settings.goal;
  const dm = document.getElementById('cfg-daily-min'); if (dm) dm.value = APP.settings.dailyMinTarget;
  const ds = document.getElementById('cfg-daily-series'); if (ds) ds.value = APP.settings.dailySeriesTarget;

  document.querySelectorAll('[data-cfg-mode]').forEach(btn => {
    const m = btn.dataset.cfgMode;
    btn.className = `mode-btn ${m}${APP.settings.mode === m ? ' active' : ''}`;
  });

  const DESCS = {
    ligero: 'Sesiones reducidas (60% volumen). Ideal con fatiga o poco tiempo.',
    normal: 'Sesiones completas con el volumen recomendado.',
    intenso: 'Volumen aumentado (130%). Solo con 2+ semanas seguidas de base.'
  };
  const md = document.getElementById('cfg-mode-desc'); if (md) md.textContent = DESCS[APP.settings.mode];

  const ml = document.getElementById('measures-last-date');
  const measures = DB.getBodyMeasures();
  if (ml) ml.textContent = measures.length > 0 ? `Última medición: ${measures[0].date}` : 'Sin medidas registradas';

  renderSessionLog();
}

function renderSessionLog() {
  const log = document.getElementById('sessions-log'); if (!log) return;
  const sessions = DB.getRecentSessions(10);
  if (!sessions.length) {
    log.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text3)">Sin sesiones guardadas.</div>';
    return;
  }
  log.innerHTML = sessions.map(s => {
    const d = s.date ? new Date(s.date+'T12:00:00') : new Date();
    const score = s.score || 0;
    return `<div class="log-entry">
      <div>
        <div class="le-date">${formatDate(d)}</div>
        <div class="le-name">${s.routine_name || s.routineName || 'Sesión'}</div>
        <div class="le-meta">${s.duration_min||s.duration||0}min · ${s.series_completed||s.series||0} series · ${s.session_type||s.type}</div>
      </div>
      <div class="le-score" style="color:var(--${getScoreColor(score)})">${score}</div>
    </div>`;
  }).join('');
}

// ════════════════════════════════════════════════════════════════
// 16. MEASURES MODAL
// ════════════════════════════════════════════════════════════════
function openMeasuresModal() {
  const modal = document.getElementById('measures-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  const measures = DB.getBodyMeasures();
  const last = measures[0];
  const fields = ['pecho','cintura','cadera','muslo','peso'];
  fields.forEach(f => {
    const el = document.getElementById(`m-${f}`); if (el) el.value = '';
    const prev = document.getElementById(`prev-${f}`);
    if (prev) prev.textContent = last && last[f] ? `Última: ${last[f]}${f==='peso'?'kg':'cm'}` : 'Primera medición';
  });
  renderMeasuresHistory();
}
function closeMeasuresModal() {
  document.getElementById('measures-modal')?.classList.add('hidden');
}
function saveMeasures() {
  const fields = ['pecho','cintura','cadera','muslo','peso'];
  const vals = {};
  let hasValue = false;
  fields.forEach(f => {
    const v = parseFloat(document.getElementById('m-'+f)?.value);
    if (v > 0) { vals[f] = v; hasValue = true; }
  });
  if (!hasValue) { showToast('Ingresa al menos una medida', 'error'); return; }
  DB.saveBodyMeasure({ date: getTodayKey(), ...vals });
  showToast('📏 Medidas guardadas', 'success');
  openMeasuresModal();
}
function renderMeasuresHistory() {
  const container = document.getElementById('measures-history'); if (!container) return;
  const measures = DB.getBodyMeasures();
  if (!measures.length) {
    container.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text3);font-size:13px">Sin mediciones previas.</div>';
    return;
  }
  const ICONS = {pecho:'1',cintura:'2',cadera:'3',muslo:'4',peso:'⚖'};
  const UNITS = {pecho:'cm',cintura:'cm',cadera:'cm',muslo:'cm',peso:'kg'};
  const COLORS= {pecho:'var(--aqua)',cintura:'var(--aqua)',cadera:'var(--orange)',muslo:'var(--green)',peso:'var(--purple)'};
  container.innerHTML = measures.map((m, i) => {
    const prev = measures[i+1];
    const fields = ['pecho','cintura','cadera','muslo','peso'].filter(f => m[f]);
    return `<div class="mhe-entry">
      <div class="mhe-date">${m.date}</div>
      <div class="mhe-grid">${fields.map(f => {
        const delta = prev && prev[f] ? m[f] - prev[f] : null;
        const dCls  = delta === null ? '' : (f==='cintura'||f==='peso') ? (delta < 0 ? 'down' : delta > 0 ? 'up' : 'same') : (delta > 0 ? 'down' : delta < 0 ? 'up' : 'same');
        const dTxt  = delta !== null ? ` <span class="mhe-delta ${dCls}">${delta>0?'+':''}${delta.toFixed(1)}</span>` : '';
        return `<div class="mhe-item"><div class="mhe-badge" style="color:${COLORS[f]}">${ICONS[f]}</div><div class="mhe-val" style="color:${COLORS[f]}">${m[f]}</div><div class="mhe-lbl">${f}${dTxt}</div></div>`;
      }).join('')}</div>
    </div>`;
  }).join('');
}

// ════════════════════════════════════════════════════════════════
// 17. TOAST
// ════════════════════════════════════════════════════════════════
let toastTimeout;
function showToast(msg, type = '') {
  const t = document.getElementById('app-toast'); if (!t) return;
  t.textContent = msg;
  t.className = `toast${type?' '+type:''} show`;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 2800);
}

// ════════════════════════════════════════════════════════════════
// 18. EVENT LISTENERS
// ════════════════════════════════════════════════════════════════
function bindEvents() {
  // Navigation
  document.querySelectorAll('[data-page]').forEach(btn =>
    btn.addEventListener('click', () => navigateTo(btn.dataset.page))
  );

  // Session tabs
  document.querySelectorAll('.stab').forEach(btn =>
    btn.addEventListener('click', () => switchTab(btn.dataset.tab))
  );

  // Home buttons
  document.getElementById('btn-home-am')?.addEventListener('click', () => {
    APP.currentTab = 'am'; navigateTo('today');
  });
  document.getElementById('btn-home-pm')?.addEventListener('click', () => {
    APP.currentTab = 'pm'; navigateTo('today');
  });

  // Mode buttons
  document.querySelectorAll('[data-mode]').forEach(btn =>
    btn.addEventListener('click', () => setTodayMode(btn.dataset.mode))
  );

  // Timer modal
  document.getElementById('modal-btn-start')?.addEventListener('click', startTimer);
  document.getElementById('modal-btn-reset')?.addEventListener('click', resetTimer);
  document.getElementById('modal-btn-complete-set')?.addEventListener('click', completeSet);
  document.getElementById('modal-btn-rest')?.addEventListener('click', completeRest);
  document.getElementById('modal-btn-next-ex')?.addEventListener('click', nextExercise);
  document.getElementById('modal-btn-close')?.addEventListener('click', closeTimerModal);

  // Exercise note popup toggle
  document.getElementById('modal-ex-info-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const popup = document.getElementById('modal-ex-note-popup');
    if (!popup) return;
    popup.classList.toggle('hidden');
  });
  document.getElementById('modal-ex-note-close')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('modal-ex-note-popup')?.classList.add('hidden');
  });
  document.getElementById('timer-modal')?.addEventListener('click', (e) => {
    const popup = document.getElementById('modal-ex-note-popup');
    const btn   = document.getElementById('modal-ex-info-btn');
    if (popup && !popup.classList.contains('hidden') &&
        !popup.contains(e.target) && e.target !== btn) {
      popup.classList.add('hidden');
    }
  });

  // Weight +/-
  document.getElementById('modal-weight-plus')?.addEventListener('click', () => {
    const inp = document.getElementById('modal-weight-input');
    inp.value = Math.max(0, (parseFloat(inp.value)||0) + 0.5);
  });
  document.getElementById('modal-weight-minus')?.addEventListener('click', () => {
    const inp = document.getElementById('modal-weight-input');
    inp.value = Math.max(0, (parseFloat(inp.value)||0) - 0.5);
  });
  document.getElementById('modal-weight-input')?.addEventListener('change', (e) => {
    if (APP.currentExercise && parseFloat(e.target.value) > 0)
      DB.saveWeight(APP.currentExercise.id, parseFloat(e.target.value));
  });

  // Exercise library filters
  document.querySelectorAll('.filter-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderExerciseLibrary();
    })
  );
  document.getElementById('exercise-search')?.addEventListener('input', e => {
    searchQuery = e.target.value; renderExerciseLibrary();
  });

  // Settings
  document.querySelectorAll('[data-cfg-mode]').forEach(btn =>
    btn.addEventListener('click', () => {
      APP.settings.mode = btn.dataset.cfgMode;
      APP.currentMode = btn.dataset.cfgMode;
      saveToStorage(); renderSettings();
      showToast('Modo: ' + btn.dataset.cfgMode);
    })
  );
  ['cfg-name','cfg-goal'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', e => {
      const key = id.replace('cfg-','');
      APP.settings[key] = e.target.value; saveToStorage();
    });
  });
  document.getElementById('cfg-daily-min')?.addEventListener('input', e => {
    APP.settings.dailyMinTarget = parseInt(e.target.value)||25; saveToStorage();
  });
  document.getElementById('cfg-daily-series')?.addEventListener('input', e => {
    APP.settings.dailySeriesTarget = parseInt(e.target.value)||20; saveToStorage();
  });

  // Session type + energy selectors
  document.querySelectorAll('.session-type-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.session-type-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    })
  );
  document.querySelectorAll('.energy-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.energy-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    })
  );

  // Measures modal
  document.getElementById('btn-open-measures')?.addEventListener('click', openMeasuresModal);
  document.getElementById('btn-open-measures-cfg')?.addEventListener('click', openMeasuresModal);
  document.getElementById('measures-modal-close')?.addEventListener('click', closeMeasuresModal);
  document.getElementById('btn-save-measures')?.addEventListener('click', saveMeasures);

  // Settings data actions
  document.getElementById('btn-clear-data')?.addEventListener('click', () => {
    if (confirm('¿Borrar todos los datos?')) {
      APP.sessions = []; APP.bodyMeasures = [];
      APP.completedExercises = {am:new Set(), pm:new Set()};
      APP.mealCompleted = {};
      APP.core = {intention:'',checkIn:null,journalToday:null,guard:false};
      localStorage.clear(); showToast('Datos borrados', 'error');
      renderHome();
    }
  });

  // ── CORE v3 events ────────────────────────────────────────────
  // Night nav button
  document.getElementById('btn-nav-night')?.addEventListener('click', () => navigateTo('night'));

  // Intention chips
  document.addEventListener('click', e => {
    const chip = e.target.closest('.int-chip');
    if (!chip) return;
    const val = chip.dataset.int;
    if (!val) return;
    // Multi-select toggle
    const idx = APP.core.intentions.indexOf(val);
    if (idx >= 0) APP.core.intentions.splice(idx,1); else APP.core.intentions.push(val);
    APP.core.intention = APP.core.intentions.join(',');
    DB.saveIntention(getTodayKey(), APP.core.intention);
    chip.classList.toggle('selected', APP.core.intentions.includes(val));
    saveToStorage();
    const lbl = APP.core.intentions.length > 0 ? APP.core.intentions.join(' · ') : 'Ninguna';
    showToast('Intención: ' + lbl);
  });

  // Check-in dots
  document.addEventListener('click', e => {
    const dot = e.target.closest('.ck-dot[data-ci]');
    if (!dot) return;
    const [metric, val] = dot.dataset.ci.split(':');
    if (!APP.core.checkIn) APP.core.checkIn = {energia:0,ansiedad:0,claridad:0,sueno:0,date:getTodayKey()};
    APP.core.checkIn[metric] = parseInt(val);
    APP.core.checkIn.date = getTodayKey();
    DB.saveCheckIn(getTodayKey(), APP.core.checkIn.energia||0, APP.core.checkIn.ansiedad||0,
      APP.core.checkIn.claridad||0, APP.core.checkIn.sueno||0);
    saveToStorage();
    renderCheckInDots();
    renderStateBarScores();
  });

  // Sleep quick-select buttons
  document.addEventListener('click', e => {
    const sleepBtn = e.target.closest('.sleep-btn');
    if (!sleepBtn) return;
    const h = parseFloat(sleepBtn.dataset.h);
    if (!APP.core.checkIn) APP.core.checkIn = {energia:0,ansiedad:0,claridad:0,sueno:0,date:getTodayKey()};
    APP.core.checkIn.sueno = h;
    APP.core.checkIn.date = getTodayKey();
    DB.saveCheckIn(getTodayKey(), APP.core.checkIn.energia||0, APP.core.checkIn.ansiedad||0,
      APP.core.checkIn.claridad||0, h);
    saveToStorage();
    document.querySelectorAll('.sleep-btn').forEach(b => b.classList.toggle('active', parseFloat(b.dataset.h)===h));
    renderStateBarScores();
    showToast('Sueño: ' + h + 'h registrado');
  });

  // Morning ritual checks
  document.addEventListener('click', e => {
    const ritBtn = e.target.closest('.ritual-item-row[data-manual]');
    if (!ritBtn) return;
    const key = ritBtn.dataset.manual;
    if (!APP.core.ritualChecks) APP.core.ritualChecks = {date:getTodayKey()};
    APP.core.ritualChecks[key] = !APP.core.ritualChecks[key];
    saveToStorage();
    renderMorningRitual();
  });

  // Journal save
  document.getElementById('btn-save-journal')?.addEventListener('click', saveJournalEntry);

  // Night page nav back
  document.getElementById('btn-night-back')?.addEventListener('click', () => navigateTo('home'));
}

// ════════════════════════════════════════════════════════════════
// 19. INIT
// ════════════════════════════════════════════════════════════════
async function init() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(r => console.log('[SW] ok', r.scope))
      .catch(e => console.warn('[SW]', e));
  }

  loadFromStorage();
  await initDB();
  DB.loadWeights();

  // Load meal completion for today
  const mealLogs = DB.getMealLogsForDate(getTodayKey());
  Object.assign(APP.mealCompleted, mealLogs);

  APP.currentDayOfWeek = new Date().getDay();

  // ── CORE v3: load today's data ───────────────────────────────
  const todayKey = getTodayKey();
  const savedIntention = DB.getTodayIntention(todayKey);
  if (savedIntention) {
    APP.core.intention = savedIntention;
    APP.core.intentions = savedIntention ? savedIntention.split(',').filter(Boolean) : [];
  }
  const savedCheckIn = DB.getTodayCheckIn(todayKey);
  if (savedCheckIn) APP.core.checkIn = savedCheckIn;
  const savedJournal = DB.getTodayJournal(todayKey);
  if (savedJournal) APP.core.journalToday = savedJournal;
  APP.core.guard = checkOverloadGuard();

  bindEvents();
  navigateTo('home');

  console.log('🌊 AquaForce v3 Core ready');
  console.log(`📅 ${new Date().toLocaleDateString('es-PE')} · Día ${APP.currentDayOfWeek}`);
  console.log(`🗄️ SQLite: ${APP.dbReady ? '✅' : '⚠️ localStorage fallback'}`);
}

document.addEventListener('DOMContentLoaded', init);
// ════════════════════════════════════════════════════════════════
// 20b. CORE v3 ADDITIONS — Ritual · Sueño · Evolución · Radar
// ════════════════════════════════════════════════════════════════

// ── Morning ritual items ──────────────────────────────────────
function getMorningRitualItems() {
  const sched = getTodaySchedule();
  const amDone = APP.completedExercises.am.size > 0;
  const intDone = APP.core.intentions.length > 0;
  const desayunoDone = !!APP.mealCompleted['desayuno'];
  const rc = APP.core.ritualChecks || {};

  return [
    { key:'respiracion', label:'Respiración 4-7-8 · 3 min', cat:'Presencia',
      done: !!rc.respiracion, manual: true },
    { key:'entrenamiento', label:'Entrenamiento AM · ' + (sched?.am?.name || 'Sesión'),
      cat:'Físico', done: amDone, manual: false },
    { key:'intencion', label:'Intención del día escrita', cat:'Mente',
      done: intDone, manual: false },
    { key:'observacion', label:'Observación emocional · 2 min', cat:'Emoción',
      done: !!rc.observacion, manual: true },
    { key:'desayuno', label:'Nutrición · Desayuno', cat:'Físico',
      done: desayunoDone, manual: false },
  ];
}

function renderMorningRitual() {
  const el = document.getElementById('core-ritual-section');
  if (!el) return;
  const items = getMorningRitualItems();
  const done = items.filter(i=>i.done).length;
  const total = items.length;
  const catColor = {Presencia:'var(--gold-core)',Físico:'var(--aqua)',Mente:'#8B6BC0',Emoción:'var(--sage-core)'};

  el.innerHTML = `
    <div class="ritual-card">
      <div class="ritual-hdr">
        <div class="ritual-title">☀️ Ritual de la mañana</div>
        <div class="ritual-count">${done}/${total} completados</div>
      </div>
      ${items.map(it => `
        <div class="ritual-item-row${it.manual?' ritual-manual':''}"
             ${it.manual?`data-manual="${it.key}"`:''}
             style="cursor:${it.manual?'pointer':'default'}">
          <div class="ritual-chk${it.done?' ritual-chk-done':''}">
            ${it.done?'✓':''}
          </div>
          <div class="ritual-item-text">${it.label}</div>
          <div class="ritual-cat" style="background:${catColor[it.cat]||'#607080'}22;color:${catColor[it.cat]||'#607080'};border-color:${catColor[it.cat]||'#607080'}44">${it.cat}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── Evolution metrics (6 axes for radar) ─────────────────────
function getEvolutionMetrics() {
  const ci      = APP.core.checkIn;
  const streak  = getStreak();
  const week    = getWeekStats();
  const jStreak = DB.getJournalStreak();

  const presencia   = ci ? Math.round(((4-ci.ansiedad)/3)*50 + (ci.claridad/3)*50) : 60;
  const calma       = ci ? Math.round(((4-ci.ansiedad)/3)*100) : 60;
  const disciplina  = Math.min(100, Math.round((streak/7)*50 + (week.completed/7)*50));
  const regulacion  = Math.min(100, Math.round((jStreak/7)*60 + (ci?(ci.claridad/3)*40:20)));
  const consistencia = Math.min(100, Math.round(week.completed/7*100));
  const foco        = ci ? Math.round((ci.claridad/3)*100) : 50;

  return { presencia, calma, consistencia, regulacion, disciplina, foco };
}

// ── Radar SVG generator ───────────────────────────────────────
function generateRadarSVG(metrics) {
  const cx=100, cy=100, maxR=65;
  // 6 axes: presencia(top), calma(top-right), consistencia(btm-right),
  //         regulacion(btm), disciplina(btm-left), foco(top-left)
  const axes = [
    {label:'PRESENCIA',   val:metrics.presencia,   a:-90},
    {label:'CALMA',       val:metrics.calma,        a:-30},
    {label:'CONS.',       val:metrics.consistencia, a:30},
    {label:'REGULACIÓN',  val:metrics.regulacion,   a:90},
    {label:'DISCIPLINA',  val:metrics.disciplina,   a:150},
    {label:'FOCO',        val:metrics.foco,         a:210},
  ];
  const toRad = d => d * Math.PI / 180;
  const pt = (r, a) => `${cx + r*Math.cos(toRad(a))},${cy + r*Math.sin(toRad(a))}`;

  // Background rings at 25,50,75,100%
  const rings = [0.25,0.5,0.75,1.0].map(p => {
    const pts = axes.map(ax => pt(maxR*p, ax.a)).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,${p===1.0?'.08':'.04'})" stroke-width="${p===1.0?'.8':'.5'}"/>`;
  }).join('');

  // Axis lines
  const axisLines = axes.map(ax =>
    `<line x1="${cx}" y1="${cy}" x2="${cx+maxR*Math.cos(toRad(ax.a))}" y2="${cy+maxR*Math.sin(toRad(ax.a))}" stroke="rgba(196,148,58,.15)" stroke-width=".5"/>`
  ).join('');

  // Data polygon
  const dataPts = axes.map(ax => pt(maxR*(ax.val/100), ax.a)).join(' ');
  const dataPolygon = `<polygon points="${dataPts}" fill="rgba(196,148,58,.15)" stroke="rgba(196,148,58,.7)" stroke-width="1.5"/>`;
  const dataDots = axes.map(ax =>
    `<circle cx="${cx+maxR*(ax.val/100)*Math.cos(toRad(ax.a))}" cy="${cy+maxR*(ax.val/100)*Math.sin(toRad(ax.a))}" r="3" fill="var(--gold-core)"/>`
  ).join('');

  // Labels
  const labelOffset = maxR + 14;
  const labels = axes.map(ax => {
    const lx = cx + labelOffset*Math.cos(toRad(ax.a));
    const ly = cy + labelOffset*Math.sin(toRad(ax.a));
    return `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central" style="font-family:Rajdhani,sans-serif;font-size:8px;font-weight:700;letter-spacing:1px;fill:rgba(200,195,175,.4)">${ax.label}</text>`;
  }).join('');

  return `<svg viewBox="0 0 200 200" class="radar-svg">${rings}${axisLines}${dataPolygon}${dataDots}${labels}</svg>`;
}

// ── Evolución page ────────────────────────────────────────────
function renderEvolucion() {
  const metrics  = getEvolutionMetrics();
  const score    = getInternalScore();
  const todaySess = getTodaySessionsData();
  const bestSess = todaySess.reduce((b,s)=>(s.score||0)>(b?.score||0)?s:b, null);
  const physScore = bestSess?.score || 0;
  const streak   = getStreak();
  const week     = getWeekStats();
  const jEntry   = APP.core.journalToday;
  const currentLevel = 4; // from metrics: would auto-calc in future

  const LEVELS = [
    {n:1,name:'Impulso',ref:'Hombre 1'},
    {n:2,name:'Reacción',ref:'Hombre 2'},
    {n:3,name:'Conciencia',ref:'Hombre 3'},
    {n:4,name:'Integración',ref:'Hombre 4'},
    {n:5,name:'Presencia',ref:'Hombre 5'},
    {n:6,name:'Estabilidad',ref:'Hombre 6'},
    {n:7,name:'Maestría',ref:'Hombre 7'},
  ];
  const curLv = LEVELS[currentLevel-1];
  const lvProgress = 62; // % to next level

  const radarSVG = generateRadarSVG(metrics);

  const metricCards = [
    {label:'PRESENCIA', val:metrics.presencia, color:'var(--gold-core)'},
    {label:'CALMA',     val:metrics.calma,     color:'var(--sage-core)'},
    {label:'DISCIPLINA',val:metrics.disciplina,color:'var(--aqua)'},
    {label:'REGULACIÓN',val:metrics.regulacion,color:'#8B6BC0'},
  ].map(m => `
    <div class="evo-metric-card">
      <div class="emc-lbl">${m.label}</div>
      <div class="emc-val" style="color:${m.color}">${m.val}</div>
      <div class="emc-bar"><div class="emc-bar-fill" style="width:${m.val}%;background:${m.color}"></div></div>
    </div>
  `).join('');

  const levelDots = LEVELS.map(l => `
    <div class="lv-dot${l.n < currentLevel?' lv-past':l.n===currentLevel?' lv-now':' lv-future'}"
         title="${l.name}"></div>
  `).join('');

  document.getElementById('page-evolucion').innerHTML = `
    <div class="page-inner">
      <div style="padding:20px 0 8px">
        <div class="eyebrow" style="color:var(--gold-core)">Tu Evolución</div>
        <h1 style="font-size:32px">${curLv.name}</h1>
      </div>

      <!-- Level card -->
      <div class="evo-level-card">
        <div class="elc-top">
          <div class="elc-num">${currentLevel}</div>
          <div class="elc-right">
            <div class="elc-name">${curLv.name}</div>
            <div class="elc-ref">${curLv.ref} · Gurdjieff</div>
            <div class="elc-desc">Cuerpo, mente y emoción empiezan a operar como un sistema.</div>
          </div>
        </div>
        <div class="elc-bar-track"><div class="elc-bar-fill" style="width:${lvProgress}%"></div></div>
        <div class="elc-dots">${levelDots}</div>
      </div>

      <!-- Radar -->
      <div class="evo-section-label">MÉTRICAS DE INTEGRACIÓN</div>
      <div class="evo-radar-wrap">${radarSVG}</div>

      <!-- 4 metric cards -->
      <div class="evo-metrics-grid">${metricCards}</div>

      <!-- Physical score today -->
      <div class="evo-section-label">ESTADO FÍSICO HOY</div>
      <div class="evo-phys-row">
        <div class="evo-phys-score" style="color:${physScore>=70?'var(--aqua)':'var(--text3)'}">
          ${physScore > 0 ? physScore : '—'}
        </div>
        <div>
          <div style="font-size:12px;color:var(--text2)">Score del día</div>
          <div style="font-size:10px;color:var(--text3);margin-top:2px">
            Racha: ${streak} días · Semana: ${week.completed}/7
          </div>
        </div>
      </div>

      <!-- Auto-observación -->
      <div class="evo-section-label">AUTO-OBSERVACIÓN DE HOY</div>
      <div class="evo-obs-card">
        ${jEntry?.q1
          ? `<div class="evo-obs-text">"${jEntry.q1}"</div>
             <div class="evo-obs-hint">Reflexión nocturna · ${getTodayKey()}</div>`
          : `<div class="evo-obs-hint" style="color:var(--text3);font-style:italic">
              Sin reflexión aún. La página <strong>Noche</strong> te espera.
             </div>`
        }
      </div>

      <div style="height:80px"></div>
    </div>
  `;
}


// ════════════════════════════════════════════════════════════════
// 20. CORE v3 — Intención · Check-in · Journaling · Guardia
// ════════════════════════════════════════════════════════════════

const INTENTIONS = ['Calma','Presencia','Claridad','Paciencia','Foco','Conciencia','Apertura'];

const HOMBRE4_PROMPTS = [
  '¿Estás reaccionando o respondiendo?',
  '¿Actúas desde presencia o desde hábito?',
  '¿Tu energía viene de propósito o de ansiedad?',
  '¿Qué automatismo observaste hoy?',
  '¿En qué momento estuviste realmente presente?',
  '¿Qué parte de ti necesitaba ser vista hoy?',
  '¿Cuándo dejaste de observar y empezaste a actuar automáticamente?'
];

function getHombre4Prompt() {
  const idx = new Date().getDay();
  return HOMBRE4_PROMPTS[idx];
}

// ── Overload guard ────────────────────────────────────────────
function checkOverloadGuard() {
  const recent = DB.getRecentCheckIns(3);
  if (recent.length < 2) return false;
  const highAnsiedad = recent.filter(c => c.ansiedad === 3).length;
  const lowSueno    = recent.filter(c => c.sueno > 0 && c.sueno < 5.5).length;
  const jStreak     = DB.getJournalStreak();
  if (highAnsiedad >= 2) return true;
  if (lowSueno >= 2) return true;
  return false;
}

// ── Internal score (4 dimensions) ────────────────────────────
function getInternalScore() {
  const todaySess = getTodaySessionsData();
  const fisico = todaySess.length > 0 ? Math.max(...todaySess.map(s=>s.score||0)) : 0;
  const ci = APP.core.checkIn;
  // Sueño: stored as raw hours, shown as hours text
  const suenoH  = ci?.sueno > 0 ? ci.sueno : 0;
  const suenoPct = suenoH > 0 ? Math.round(Math.min(suenoH / 8 * 100, 100)) : 0;
  // Presencia: inverse_ansiedad(50%) + claridad(50%)
  const presencia = ci ? Math.round(((4-ci.ansiedad)/3)*50 + (ci.claridad/3)*50) : 0;
  // Calma: inverse of ansiedad
  const calma   = ci ? Math.round(((4-ci.ansiedad)/3)*100) : 0;
  return { fisico, sueno: suenoPct, suenoH, presencia, calma };
}

// ── Render core elements in home ─────────────────────────────
function renderCoreHomeElements() {
  // Intention card
  const intEl = document.getElementById('core-intention-card');
  if (intEl) {
    const chips = INTENTIONS.map(i =>
      `<button class="int-chip${APP.core.intentions.includes(i)?' selected':''}" data-int="${i}">${i}</button>`
    ).join('');
    intEl.innerHTML = `
      <div class="int-label">Intención de la mañana <span style="opacity:.4;font-weight:400;font-size:8px">· elige una o más</span></div>
      <div class="int-question">"¿Desde qué estado quiero operar hoy?"</div>
      <div class="int-chips">${chips}</div>
    `;
  }

  // State bar 4 metrics
  renderStateBarScores();

  // Hombre 4 quote
  const h4El = document.getElementById('core-h4-prompt');
  if (h4El) {
    h4El.textContent = getHombre4Prompt();
  }

  // Guard banner
  const guardEl = document.getElementById('core-guard-banner');
  if (guardEl) {
    APP.core.guard = checkOverloadGuard();
    if (APP.core.guard) {
      guardEl.style.display = 'block';
      guardEl.querySelector('.guard-msg').textContent =
        'El sistema detectó señales de sobrecarga. Hoy lo esencial es suficiente.';
    } else {
      guardEl.style.display = 'none';
    }
  }

  // Night link: show journal completion
  const nightBtn = document.getElementById('btn-home-night');
  if (nightBtn) {
    const jDone = !!APP.core.journalToday?.q1;
    nightBtn.textContent = jDone ? '🌙 Reflexión completada ✓' : '🌙 Reflexión nocturna';
    nightBtn.classList.toggle('done', jDone);
  }

  // Morning ritual
  renderMorningRitual();
}

function renderStateBarScores() {
  const score = getInternalScore();
  const bars = [
    {id:'sb-fisico',  val: score.fisico, disp: score.fisico>0?score.fisico:'—', color:'var(--aqua)'},
    {id:'sb-sueno',   val: score.sueno,  disp: score.suenoH>0?(score.suenoH+'h'):'—', color:'#607080'},
    {id:'sb-presencia',val:score.presencia, disp: score.presencia>0?score.presencia:'—', color:'var(--gold-core)'},
    {id:'sb-calma',   val: score.calma,  disp: score.calma>0?score.calma:'—', color:'var(--sage-core)'},
  ];
  bars.forEach(b => {
    const el = document.getElementById(b.id);
    if (!el) return;
    const valEl = el.querySelector('.sb-val');
    const barEl = el.querySelector('.sb-bar');
    if (valEl) valEl.textContent = b.disp;
    if (barEl) { barEl.style.width = (b.val||0) + '%'; barEl.style.background = b.color; }
  });
}

// ── Check-in dots render ──────────────────────────────────────
function renderCheckInDots() {
  if (!APP.core.checkIn) return;
  ['energia','ansiedad','claridad'].forEach(metric => {
    const val = APP.core.checkIn[metric] || 0;
    for (let i=1; i<=3; i++) {
      const dot = document.querySelector(`.ck-dot[data-ci="${metric}:${i}"]`);
      if (!dot) continue;
      dot.classList.remove('sel-low','sel-mid','sel-hi','sel-none');
      if (i <= val) {
        dot.classList.add(i===1?'sel-low':i===2?'sel-mid':'sel-hi');
      }
    }
    const lbl = document.querySelector(`.ck-lbl-val[data-lbl="${metric}"]`);
    if (lbl) {
      const labels = {energia:['—','Baja','Media','Alta'],ansiedad:['—','Baja','Media','Alta'],claridad:['—','Baja','Media','Alta']};
      lbl.textContent = labels[metric][val] || '—';
    }
  });
}

// ── Night page render ─────────────────────────────────────────
function renderNight() {
  const today   = new Date();
  const todayKey = getTodayKey();
  const jEntry  = APP.core.journalToday || DB.getTodayJournal(todayKey) || {};
  const jStreak = DB.getJournalStreak();
  const guard   = APP.core.guard;
  const prompt  = getHombre4Prompt();

  const dateStr = today.toLocaleDateString('es-PE',{weekday:'long',day:'numeric',month:'long'});

  // If guard active: show only 1 question
  const questions = guard
    ? [{key:'q3', text:'¿Qué momento fue genuino y presente hoy?'}]
    : [
        {key:'q1', text:'¿Qué me dominó hoy?'},
        {key:'q2', text:'¿Cómo reaccioné automáticamente?'},
        {key:'q3', text:'¿Qué momento fue genuino y presente?'}
      ];

  const questionsHtml = questions.map((q,i) => `
    <div class="journal-q">
      <div class="jq-num">${String(i+1).padStart(2,'0')}</div>
      <div class="jq-text">"${q.text}"</div>
      <textarea class="jq-field" id="jq-${q.key}" rows="3" placeholder="Escribe aquí...">${jEntry[q.key]||''}</textarea>
    </div>
  `).join('');

  const guardBadge = guard
    ? `<div class="guard-night-badge">🛡️ Modo simplificado activo — Solo lo esencial</div>`
    : '';

  const streakBadge = jStreak > 1
    ? `<div class="journal-streak">🌙 ${jStreak} noches seguidas</div>`
    : '';

  document.getElementById('page-night').innerHTML = `
    <div class="page-inner">
      <div style="display:flex;align-items:center;gap:12px;padding:20px 0 8px">
        <button class="btn btn-ghost" id="btn-night-back" style="padding:8px 12px;font-size:12px">← Volver</button>
        <div>
          <div class="eyebrow" style="color:var(--gold-core)">Reflexión · Noche</div>
          <h1 style="font-size:26px">Noche</h1>
        </div>
      </div>

      <div class="night-date">${dateStr}</div>

      ${guardBadge}
      ${streakBadge}

      <!-- Check-in rápido -->
      <div class="checkin-card">
        <div class="section-title-small">Check-in del día</div>
        ${['energia','ansiedad','claridad'].map(m => `
          <div class="ck-row">
            <div class="ck-lbl">${m.charAt(0).toUpperCase()+m.slice(1)}</div>
            <div class="ck-dots">
              <div class="ck-dot" data-ci="${m}:1">Bajo</div>
              <div class="ck-dot" data-ci="${m}:2">Medio</div>
              <div class="ck-dot" data-ci="${m}:3">Alto</div>
            </div>
            <div class="ck-lbl-val" data-lbl="${m}">—</div>
          </div>
        `).join('')}
      </div>

      <!-- 3 Journal questions -->
      <div class="section-title-small" style="margin:16px 0 8px">Cuarto Camino · ${guard?'1 pregunta':'3 preguntas'}</div>
      ${questionsHtml}

      <!-- Philosophical prompt -->
      <div class="h4-quote-card">
        <div class="h4q-label">Observación interna</div>
        <div class="h4q-text">"${prompt}"</div>
      </div>

      <!-- Save button -->
      <button class="btn btn-primary" id="btn-save-journal" style="width:100%;padding:14px;margin:16px 0">
        Guardar reflexión
      </button>

      <div style="height:80px"></div>
    </div>
  `;

  // Restore check-in dots
  renderCheckInDots();

  // Rebind save + back
  document.getElementById('btn-save-journal')?.addEventListener('click', saveJournalEntry);
  document.getElementById('btn-night-back')?.addEventListener('click', () => navigateTo('home'));
}

function saveJournalEntry() {
  const todayKey = getTodayKey();
  const q1 = document.getElementById('jq-q1')?.value || '';
  const q2 = document.getElementById('jq-q2')?.value || '';
  const q3 = document.getElementById('jq-q3')?.value || '';

  if (!q1 && !q2 && !q3) { showToast('Escribe al menos una reflexión', 'error'); return; }

  DB.saveJournalEntry(todayKey, q1, q2, q3);
  APP.core.journalToday = {date:todayKey, q1, q2, q3};
  saveToStorage();
  showToast('Reflexión guardada ✓');

  // Update night link on home when returning
  setTimeout(() => {
    const nightBtn = document.getElementById('btn-home-night');
    if (nightBtn) { nightBtn.textContent = '🌙 Reflexión completada ✓'; nightBtn.classList.add('done'); }
  }, 500);
}

