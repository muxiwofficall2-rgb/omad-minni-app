/* =========================================================
   OMAD TOUR MINI APP
   HTML + CSS + JavaScript
   ========================================================= */


/* TELEGRAM */

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}


/* STATE */

const state = {
    screen: "home",

    history: [],

    language:
        localStorage.getItem("omad_language") || "uz",

    theme:
        localStorage.getItem("omad_theme") || "light",

    flight: {
        from: "",
        to: "",
        date: "",
        child: null,
        childAge: "",
        phone: ""
    },

    visa: {
        image: null,
        barcode: "",
        phone: ""
    },

    help: {
        text: "",
        image: null
    }
};


/* TRANSLATIONS */

const translations = {

    uz: {
        home: "Bosh sahifa",
        flight: "Aviabilet",
        visa: "Viza masalasi",
        requests: "So‘rov va savolim natijasi",
        help: "Yordam",
        specialist: "Mutaxassis bilan bog‘lanish",
        groups: "Kerakli guruhlar",
        address: "Manzilimiz",

        flightDesc:
            "Aviabilet bo‘yicha so‘rovingizni yuboring",

        visaDesc:
            "Viza anketasi va javobini tekshirish",

        requestDesc:
            "Yuborgan so‘rovlaringiz holatini ko‘ring",

        helpDesc:
            "Muammo yoki savolingiz bo‘lsa yozing",

        specialistDesc:
            "Bizning mutaxassis bilan bog‘laning",

        groupsDesc:
            "Bizga kerakli Telegram guruhlar",

        addressDesc:
            "OMAD TOUR ofisi",

        from:
            "Qayerdan ketmoqchisiz?",

        to:
            "Qayerga?",

        date:
            "Safar sanasi",

        child:
            "Siz bilan bola ham ketadimi?",

        yes:
            "Ha",

        no:
            "Yo‘q",

        age:
            "Iltimos, bolaning yoshiga mos qatorni belgilang",

        baby:
            "Chaqaloq",

        childAge:
            "Bola",

        phone:
            "Telefon raqamingiz",

        send:
            "Buyurtmani yuborish",

        chooseDate:
            "Sanani tanlang",

        visaCheck:
            "Viza javobini tekshirish",

        visaRequest:
            "Vizani biz orqali tekshirish",

        upload:
            "Blankani yuklash",

        barcode:
            "Barcode raqami",

        scan:
            "Barcode aniqlash",

        helpText:
            "Muammo yoki savolingizni yozing",

        uploadImage:
            "Rasm yuklash",

        sendQuestion:
            "Savolni yuborish",

        noRequests:
            "Hozircha so‘rovlar yo‘q",

        addressText:
            '4-КРАСНОАРМЕЙСКАЯ УЛИЦА, ДОМ 3, ОФИС "ОМАД ТУР", АРКА, ДОМАФОН 22В',

        ready:
            "Tayyor",

        processing:
            "Jarayonda",

        deleted:
            "O‘chirildi",

        answer:
            "Javob",

        language:
            "Til"
    },


    ru: {
        home: "Главная",
        flight: "Авиабилет",
        visa: "Визовый вопрос",
        requests: "Мои запросы",
        help: "Помощь",
        specialist: "Связаться со специалистом",
        groups: "Полезные группы",
        address: "Наш адрес",

        flightDesc:
            "Отправить запрос на авиабилет",

        visaDesc:
            "Визовая анкета и проверка ответа",

        requestDesc:
            "Статус ваших запросов",

        helpDesc:
            "Напишите вашу проблему",

        specialistDesc:
            "Связаться с нашим специалистом",

        groupsDesc:
            "Полезные Telegram-группы",

        addressDesc:
            "Офис OMAD TOUR",

        from:
            "Откуда вы летите?",

        to:
            "Куда?",

        date:
            "Дата поездки",

        child:
            "С вами едет ребёнок?",

        yes:
            "Да",

        no:
            "Нет",

        age:
            "Выберите возраст ребёнка",

        baby:
            "Младенец",

        childAge:
            "Ребёнок",

        phone:
            "Ваш номер телефона",

        send:
            "Отправить заявку",

        chooseDate:
            "Выберите дату",

        visaCheck:
            "Проверить ответ визы",

        visaRequest:
            "Проверить визу через нас",

        upload:
            "Загрузить анкету",

        barcode:
            "Номер штрихкода",

        scan:
            "Определить штрихкод",

        helpText:
            "Опишите проблему или вопрос",

        uploadImage:
            "Загрузить фото",

        sendQuestion:
            "Отправить вопрос",

        noRequests:
            "Запросов пока нет",

        addressText:
            '4-КРАСНОАРМЕЙСКАЯ УЛИЦА, ДОМ 3, ОФИС "ОМАД ТУР", АРКА, ДОМАФОН 22В',

        ready:
            "Готово",

        processing:
            "В обработке",

        deleted:
            "Удалено",

        answer:
            "Ответ",

        language:
            "Язык"
    },


    tk: {
        home: "Baş sahypa",
        flight: "Awia bilet",
        visa: "Wiza meselesi",
        requests: "Soraglarym",
        help: "Kömek",
        specialist: "Hünärmen bilen habarlaşmak",
        groups: "Gerekli toparlar",
        address: "Salghymyz",

        flightDesc:
            "Awia bilet boýunça arza iberiň",

        visaDesc:
            "Wiza anketasy we jogaby",

        requestDesc:
            "Iberen arzalaryňyzyň ýagdaýy",

        helpDesc:
            "Mesele ýa-da soragyňyz bolsa ýazyň",

        specialistDesc:
            "Hünärmen bilen habarlaşyň",

        groupsDesc:
            "Gerekli Telegram toparlary",

        addressDesc:
            "OMAD TOUR ofisi",

        from:
            "Nireden uçmak isleýärsiňiz?",

        to:
            "Nirä?",

        date:
            "Syýahat senesi",

        child:
            "Çaga hem gidýärmi?",

        yes:
            "Hawa",

        no:
            "Ýok",

        age:
            "Çaganyň ýaşyny saýlaň",

        baby:
            "Çaga",

        childAge:
            "Çaga",

        phone:
            "Telefon belgiňiz",

        send:
            "Arzany ibermek",

        chooseDate:
            "Sene saýlaň",

        visaCheck:
            "Wiza jogabyny barlamak",

        visaRequest:
            "Wizany biziň üsti bilen barlamak",

        upload:
            "Blankany ýüklemek",

        barcode:
            "Ştrih-kod belgisi",

        scan:
            "Ştrih-kody anyklamak",

        helpText:
            "Meseläňizi ýa-da soragyňyzy ýazyň",

        uploadImage:
            "Surat ýüklemek",

        sendQuestion:
            "Soragy ibermek",

        noRequests:
            "Häzirçe sorag ýok",

        addressText:
            '4-КРАСНОАРМЕЙСКАЯ УЛИЦА, ДОМ 3, ОФИС "ОМАД ТУР", АРКА, ДОМАФОН 22В',

        ready:
            "Taýýar",

        processing:
            "Işlenýär",

        deleted:
            "Öçürildi",

        answer:
            "Jogap",

        language:
            "Dil"
    },


    en: {
        home: "Home",
        flight: "Flight ticket",
        visa: "Visa",
        requests: "My requests",
        help: "Help",
        specialist: "Contact specialist",
        groups: "Useful groups",
        address: "Our address",

        flightDesc:
            "Send a flight ticket request",

        visaDesc:
            "Visa application and result",

        requestDesc:
            "Check your requests",

        helpDesc:
            "Write your problem",

        specialistDesc:
            "Contact our specialist",

        groupsDesc:
            "Useful Telegram groups",

        addressDesc:
            "OMAD TOUR office",

        from:
            "Where are you flying from?",

        to:
            "Where are you going?",

        date:
            "Travel date",

        child:
            "Is a child travelling with you?",

        yes:
            "Yes",

        no:
            "No",

        age:
            "Select the child's age",

        baby:
            "Infant",

        childAge:
            "Child",

        phone:
            "Your phone number",

        send:
            "Send request",

        chooseDate:
            "Select date",

        visaCheck:
            "Check visa result",

        visaRequest:
            "Check visa through us",

        upload:
            "Upload application",

        barcode:
            "Barcode number",

        scan:
            "Detect barcode",

        helpText:
            "Write your problem or question",

        uploadImage:
            "Upload image",

        sendQuestion:
            "Send question",

        noRequests:
            "No requests yet",

        addressText:
            '4-KRASNOARMEYSKAYA STREET, HOUSE 3, OFFICE "OMAD TOUR", ARCH, INTERCOM 22V',

        ready:
            "Ready",

        processing:
            "Processing",

        deleted:
            "Deleted",

        answer:
            "Answer",

        language:
            "Language"
    }
};


function t(key) {
    return translations[state.language][key] ||
           translations.uz[key] ||
           key;
}


/* ICONS */

const icons = {

    plane: `
    <svg viewBox="0 0 24 24">
        <path d="M21 16L13 12.5V5.5
                 C13 4.67 12.33 4 11.5 4
                 C10.67 4 10 4.67 10 5.5V12.5L3 16V18L10 16.5V20L8 21V22H15V21L13 20V16.5L21 18V16Z"
              fill="currentColor"/>
    </svg>`,

    visa: `
    <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16"
              rx="3"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"/>
        <path d="M7 9h10M7 13h6M7 17h4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"/>
    </svg>`,

    request: `
    <svg viewBox="0 0 24 24">
        <path d="M5 4h14v16H5z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"/>
        <path d="M8 8h8M8 12h8M8 16h5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"/>
    </svg>`,

    help: `
    <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"/>
        <path d="M9.5 9a2.5 2.5 0 1 1 4.6 1.4
                 c-.9 1-2.1 1.1-2.1 2.6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"/>
        <circle cx="12" cy="16.8" r="1"
                fill="currentColor"/>
    </svg>`,

    person: `
    <svg viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"/>
        <path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"/>
    </svg>`,

    group: `
    <svg viewBox="0 0 24 24">
        <circle cx="9" cy="9" r="3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"/>
        <circle cx="17" cy="10" r="2.3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"/>
        <path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M15 15c3 0 5 1.5 6 5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"/>
    </svg>`,

    location: `
    <svg viewBox="0 0 24 24">
        <path d="M12 21s7-6.2 7-12
                 a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"/>
        <circle cx="12" cy="9" r="2.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"/>
    </svg>`,

    telegram: `
    <svg viewBox="0 0 24 24">
        <path d="M21 4L3 11l7 3 2 6 3-5 4 3z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linejoin="round"/>
    </svg>`,

    whatsapp: `
    <svg viewBox="0 0 24 24">
        <path d="M20 11.5a8 8 0 0 1-12 7
                 L4 20l1.5-3.5
                 A8 8 0 1 1 20 11.5z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"/>
        <path d="M9 8c.3 2.5 2 4.5 4.5 5
                 .5.2 1-.2 1.4-.7"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"/>
    </svg>`,

    phone: `
    <svg viewBox="0 0 24 24">
        <path d="M7 3h3l1 5-2 1
                 a13 13 0 0 0 6 6l1-2 5 1v3
                 c0 2-2 3-4 3
                 C10 20 4 14 4 7
                 4 5 5 3 7 3z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"/>
    </svg>`,

    sms: `
    <svg viewBox="0 0 24 24">
        <path d="M4 5h16v11H8l-4 4z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"/>
    </svg>`,

    max: `
    <svg viewBox="0 0 24 24">
        <path d="M5 5h14v11H9l-4 3z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"/>
        <path d="M8 9h8M8 12h5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"/>
    </svg>`
};


/* SCREEN */

const screen = document.getElementById("screen");
const backBtn = document.getElementById("backBtn");
const pageTitle = document.getElementById("pageTitle");


function render() {

    document.body.classList.toggle(
        "dark",
        state.theme === "dark"
    );

    backBtn.classList.toggle(
        "hidden",
        state.screen === "home"
    );

    const pages = {
        home: renderHome,
        flight: renderFlight,
        visa: renderVisa,
        requests: renderRequests,
        help: renderHelp,
        specialist: renderSpecialist,
        groups: renderGroups,
        address: renderAddress,
        admin: renderAdmin
    };

    if (pages[state.screen]) {
        screen.innerHTML = pages[state.screen]();
    }

    updateTitle();
}


function updateTitle() {

    const titles = {
        home: t("home"),
        flight: t("flight"),
        visa: t("visa"),
        requests: t("requests"),
        help: t("help"),
        specialist: t("specialist"),
        groups: t("groups"),
        address: t("address"),
        admin: "Admin"
    };

    pageTitle.textContent =
        titles[state.screen] || "OMAD TOUR";
}


/* NAVIGATION */

function openScreen(name) {

    if (state.screen !== name) {
        state.history.push(state.screen);
    }

    state.screen = name;

    render();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function goBack() {

    if (state.history.length > 0) {
        state.screen =
            state.history.pop();
    } else {
        state.screen = "home";
    }

    render();
}


/* HOME */

function renderHome() {

    return `

        <section class="hero">

            <img
                class="hero-logo"
                src="assets/logo.png"
                alt="OMAD TOUR">

            <h1>OMAD TOUR</h1>

            <p>
                Aviakassa • Viza • Yordam
            </p>

        </section>


        <section class="menu">

            ${menuCard(
                "plane",
                t("flight"),
                t("flightDesc"),
                "flight"
            )}

            ${menuCard(
                "visa",
                t("visa"),
                t("visaDesc"),
                "visa"
            )}

            ${menuCard(
                "request",
                t("requests"),
                t("requestDesc"),
                "requests"
            )}

            ${menuCard(
                "help",
                t("help"),
                t("helpDesc"),
                "help"
            )}

            ${menuCard(
                "person",
                t("specialist"),
                t("specialistDesc"),
                "specialist"
            )}

            ${menuCard(
                "group",
                t("groups"),
                t("groupsDesc"),
                "groups"
            )}

            ${menuCard(
                "location",
                t("address"),
                t("addressDesc"),
                "address"
            )}

            <button
                class="menu-card"
                onclick="toggleLanguage()">

                <div class="menu-icon">
                    🌐
                </div>

                <div class="menu-content">
                    <strong>${t("language")}</strong>
                    <span>${languageName()}</span>
                </div>

                <div class="chevron">›</div>

            </button>

        </section>

    `;
}


function menuCard(icon, title, desc, page) {

    return `
        <button
            class="menu-card"
            onclick="openScreen('${page}')">

            <div class="menu-icon">
                ${icons[icon]}
            </div>

            <div class="menu-content">

                <strong>${title}</strong>

                <span>${desc}</span>

            </div>

            <div class="chevron">›</div>

        </button>
    `;
}


/* LANGUAGE */

function toggleLanguage() {

    document
        .getElementById("languageBox")
        .classList.toggle("hidden");
}


function setLanguage(lang) {

    state.language = lang;

    localStorage.setItem(
        "omad_language",
        lang
    );

    document
        .getElementById("languageBox")
        .classList.add("hidden");

    render();
}


function languageName() {

    const names = {
        uz: "O‘zbekcha",
        ru: "Русский",
        tk: "Türkmençe",
        en: "English"
    };

    return names[state.language];
}


/* THEME */

function toggleTheme() {

    state.theme =
        state.theme === "dark"
            ? "light"
            : "dark";

    localStorage.setItem(
        "omad_theme",
        state.theme
    );

    render();
}


/* FLIGHT */

function renderFlight() {

    return `

        <h1 class="page-title">
            ${t("flight")}
        </h1>

        <p class="page-subtitle">
            ${t("flightDesc")}
        </p>


        <div class="form-card">

            <div class="field">

                <label>
                    ${t("from")}
                </label>

                <input
                    id="flightFrom"
                    value="${escapeHtml(state.flight.from)}"
                    placeholder="Санкт-Петербург"
                    autocomplete="off">

            </div>


            <div class="field">

                <label>
                    ${t("to")}
                </label>

                <input
                    id="flightTo"
                    value="${escapeHtml(state.flight.to)}"
                    placeholder="Самарканд"
                    autocomplete="off">

            </div>


            <div class="field">

                <label>
                    ${t("date")}
                </label>

                ${renderCalendar()}

            </div>


            <div class="field">

                <label>
                    ${t("child")}
                </label>

                <div class="choice-row">

                    <button
                        class="choice ${state.flight.child === true ? "active" : ""}"
                        onclick="chooseChild(true)">
                        ${t("yes")}
                    </button>

                    <button
                        class="choice ${state.flight.child === false ? "active" : ""}"
                        onclick="chooseChild(false)">
                        ${t("no")}
                    </button>

                </div>

            </div>


            ${
                state.flight.child === true
                    ? renderChildAge()
                    : ""
            }


            <div class="field">

                <label>
                    ${t("phone")}
                </label>

                <input
                    id="flightPhone"
                    value="${escapeHtml(state.flight.phone)}"
                    type="tel"
                    placeholder="+7 999 123-45-67">

            </div>


            <button
                class="primary-btn"
                onclick="submitFlight()">

                ${t("send")}

            </button>


            <div style="height:10px"></div>


            <button
                class="secondary-btn"
                onclick="shareFlight('telegram')">

                Telegram

            </button>

            <div style="height:8px"></div>

            <button
                class="secondary-btn"
                onclick="shareFlight('whatsapp')">

                WhatsApp

            </button>

            <div style="height:8px"></div>

            <button
                class="secondary-btn"
                onclick="shareFlight('max')">

                MAX

            </button>

            <div style="height:8px"></div>

            <button
                class="secondary-btn"
                onclick="shareFlight('sms')">

                SMS

            </button>

            <div style="height:8px"></div>

            <button
                class="secondary-btn"
                onclick="window.location.href='tel:+79811939094'">

                ${icons.phone}
                &nbsp; ${t("specialist")}

            </button>

        </div>
    `;
}


/* CALENDAR */

let calendarDate = new Date();


function renderCalendar() {

    const year =
        calendarDate.getFullYear();

    const month =
        calendarDate.getMonth();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const first =
        new Date(year, month, 1)
            .getDay();

    const offset =
        first === 0 ? 6 : first - 1;

    const days =
        new Date(year, month + 1, 0)
            .getDate();

    let html = "";

    for (let i = 0; i < offset; i++) {
        html += `<div></div>`;
    }

    for (let day = 1; day <= days; day++) {

        const value =
            `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

        const selected =
            state.flight.date === value
                ? "selected"
                : "";

        html += `
            <button
                class="day ${selected}"
                onclick="selectDate('${value}')">
                ${day}
            </button>
        `;
    }

    return `
        <div class="calendar">

            <div class="calendar-head">

                <button onclick="changeMonth(-1)">
                    ‹
                </button>

                <div class="calendar-title">
                    ${months[month]} ${year}
                </div>

                <button onclick="changeMonth(1)">
                    ›
                </button>

            </div>

            <div class="weekdays">

                <div>Пн</div>
                <div>Вт</div>
                <div>Ср</div>
                <div>Чт</div>
                <div>Пт</div>
                <div>Сб</div>
                <div>Вс</div>

            </div>

            <div class="calendar-grid">

                ${html}

            </div>

        </div>
    `;
}


function changeMonth(step) {

    calendarDate.setMonth(
        calendarDate.getMonth() + step
    );

    render();
}


function selectDate(date) {

    state.flight.date = date;

    render();

    toast(
        formatDate(date)
    );
}


function formatDate(date) {

    const d =
        new Date(date + "T00:00:00");

    return d.toLocaleDateString(
        state.language === "ru"
            ? "ru-RU"
            : state.language === "en"
                ? "en-US"
                : "ru-RU",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


/* CHILD */

function chooseChild(value) {

    state.flight.child = value;

    if (!value) {
        state.flight.childAge = "";
    }

    render();
}


function renderChildAge() {

    return `

        <div class="field">

            <label>
                ${t("age")}
            </label>

            <div class="age-grid">

                <button
                    class="age-card ${
                        state.flight.childAge === "0-2"
                            ? "active"
                            : ""
                    }"
                    onclick="chooseAge('0-2')">

                    <strong>
                        ${t("baby")} — 0–2
                    </strong>

                    <span>
                        Tug‘ilganidan 2 yoshgacha
                    </span>

                </button>


                <button
                    class="age-card ${
                        state.flight.childAge === "2-12"
                            ? "active"
                            : ""
                    }"
                    onclick="chooseAge('2-12')">

                    <strong>
                        ${t("childAge")} — 2–12
                    </strong>

                    <span>
                        2 yoshdan 12 yoshgacha
                    </span>

                </button>

            </div>

        </div>
    `;
}


function chooseAge(age) {

    state.flight.childAge = age;

    render();
}


/* FLIGHT SUBMIT */

function submitFlight() {

    state.flight.from =
        document.getElementById("flightFrom").value.trim();

    state.flight.to =
        document.getElementById("flightTo").value.trim();

    state.flight.phone =
        document.getElementById("flightPhone").value.trim();


    if (!state.flight.from) {
        toast("Qayerdan ketishingizni yozing");
        return;
    }

    if (!state.flight.to) {
        toast("Qayerga borishingizni yozing");
        return;
    }

    if (!state.flight.date) {
        toast("Sanani tanlang");
        return;
    }

    if (state.flight.child === null) {
        toast("Bola bor yoki yo‘qligini tanlang");
        return;
    }

    if (
        state.flight.child === true &&
        !state.flight.childAge
    ) {
        toast("Bolaning yoshini tanlang");
        return;
    }

    if (!state.flight.phone) {
        toast("Telefon raqamingizni kiriting");
        return;
    }


    const request = {

        id: generateId(),

        type: "FLIGHT",

        createdAt:
            new Date().toISOString(),

        status: "PROCESSING",

        ...state.flight

    };


    saveRequest(request);


    const text =
        createFlightText(request);


    sendToTelegram(text);


    toast("So‘rov yuborildi");

    setTimeout(() => {
        openScreen("requests");
    }, 700);
}


/* FLIGHT TEXT */

function createFlightText(data) {

    return `OMAD TOUR — AVIABILET SO‘ROVI

ID: #${data.id}

Qayerdan: ${data.from}

Qayerga: ${data.to}

Sana: ${formatDate(data.date)}

Bola: ${data.child ? "Ha" : "Yo‘q"}

${data.child ? `Bola yoshi: ${data.childAge}` : ""}

Telefon: ${data.phone}`;
}


/* SHARE */

function shareFlight(type) {

    const from =
        document.getElementById("flightFrom")?.value || "";

    const to =
        document.getElementById("flightTo")?.value || "";

    const text =
        `OMAD TOUR — AVIABILET SO‘ROVI\n\n` +
        `Qayerdan: ${from}\n` +
        `Qayerga: ${to}\n` +
        `Sana: ${state.flight.date || "—"}\n`;

    const encoded =
        encodeURIComponent(text);


    if (type === "telegram") {

        window.open(
            `https://t.me/share/url?url=&text=${encoded}`,
            "_blank"
        );

    }

    else if (type === "whatsapp") {

        window.open(
            `https://wa.me/?text=${encoded}`,
            "_blank"
        );

    }

    else if (type === "max") {

        window.open(
            `https://max.ru/share?text=${encoded}`,
            "_blank"
        );

    }

    else if (type === "sms") {

        window.location.href =
            `sms:+79811939094?body=${encoded}`;

    }
}


/* VISA */

function renderVisa() {

    return `

        <h1 class="page-title">
            ${t("visa")}
        </h1>

        <p class="page-subtitle">
            Turkmeniston fuqarolari uchun
            viza anketasi bo‘yicha yordam.
        </p>


        <a
            class="link-card"
            href="https://visa.mfa.uz/ruxsat/view"
            target="_blank">

            <strong>
                ${t("visaCheck")}
            </strong>

            <span>
                visa.mfa.uz
            </span>

        </a>


        <div class="form-card">

            <h3>
                ${t("visaRequest")}
            </h3>


            <div class="field">

                <label>
                    ${t("upload")}
                </label>

                <div class="file-box">

                    <input
                        id="visaImage"
                        type="file"
                        accept="image/*"
                        onchange="visaImageSelected(event)">

                    <p>
                        Anketa rasmini tanlang
                    </p>

                </div>

            </div>


            ${
                state.visa.image
                    ? `
                        <div class="barcode-result">
                            Rasm tanlandi ✓
                        </div>
                    `
                    : ""
            }


            <div class="field">

                <label>
                    ${t("barcode")}
                </label>

                <input
                    id="visaBarcode"
                    value="${escapeHtml(state.visa.barcode)}"
                    placeholder="Barcode">

            </div>


            <button
                class="secondary-btn"
                onclick="scanBarcode()">

                ${t("scan")}

            </button>


            <div style="height:12px"></div>


            <div class="field">

                <label>
                    ${t("phone")}
                </label>

                <input
                    id="visaPhone"
                    type="tel"
                    placeholder="+7">

            </div>


            <button
                class="primary-btn"
                onclick="submitVisa()">

                ${t("send")}

            </button>

        </div>

    `;
}


/* VISA IMAGE */

function visaImageSelected(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    state.visa.image = file;

    toast("Rasm tanlandi");

    render();
}


/* BARCODE */

async function scanBarcode() {

    if (!state.visa.image) {
        toast("Avval rasm yuklang");
        return;
    }


    if (
        "BarcodeDetector" in window
    ) {

        try {

            const detector =
                new BarcodeDetector({
                    formats: [
                        "code_128",
                        "code_39",
                        "ean_13",
                        "ean_8",
                        "qr_code"
                    ]
                });


            const bitmap =
                await createImageBitmap(
                    state.visa.image
                );


            const codes =
                await detector.detect(
                    bitmap
                );


            if (codes.length) {

                state.visa.barcode =
                    codes[0].rawValue;

                render();

                toast(
                    `Barcode: ${codes[0].rawValue}`
                );

                return;
            }

        } catch (error) {

            console.error(error);

        }
    }


    toast(
        "Brauzer barcode aniqlashni qo‘llamadi. Backend OCR/barcode servis ulanadi."
    );
}


/* VISA SUBMIT */

function submitVisa() {

    state.visa.barcode =
        document.getElementById("visaBarcode").value.trim();

    state.visa.phone =
        document.getElementById("visaPhone").value.trim();


    if (!state.visa.image) {
        toast("Anketa rasmini yuklang");
        return;
    }

    if (!state.visa.barcode) {
        toast("Barcode raqamini kiriting yoki aniqlang");
        return;
    }

    if (!state.visa.phone) {
        toast("Telefon raqamingizni kiriting");
        return;
    }


    const request = {

        id: generateId(),

        type: "VISA",

        createdAt:
            new Date().toISOString(),

        status: "PROCESSING",

        barcode:
            state.visa.barcode,

        phone:
            state.visa.phone

    };


    saveRequest(request);


    sendToTelegram(
        `OMAD TOUR — VIZA SO‘ROVI

ID: #${request.id}

Barcode: ${request.barcode}

Telefon: ${request.phone}`
    );


    toast("Viza so‘rovi yuborildi");

    setTimeout(() => {
        openScreen("requests");
    }, 700);
}


/* REQUESTS */

function getRequests() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "omad_requests"
            ) || "[]"
        );

    } catch {

        return [];

    }
}


function saveRequest(request) {

    const requests =
        getRequests();

    requests.unshift(request);

    localStorage.setItem(
        "omad_requests",
        JSON.stringify(requests)
    );
}


function renderRequests() {

    const requests =
        getRequests();


    if (!requests.length) {

        return `

            <h1 class="page-title">
                ${t("requests")}
            </h1>

            <div class="form-card">

                <p style="text-align:center;color:var(--muted)">
                    ${t("noRequests")}
                </p>

            </div>

        `;
    }


    return `

        <h1 class="page-title">
            ${t("requests")}
        </h1>

        <p class="page-subtitle">
            Yuborgan so‘rovlaringiz shu yerda ko‘rinadi.
        </p>

        ${requests.map(requestCard).join("")}

    `;
}


function requestCard(request) {

    let statusClass =
        request.status === "READY"
            ? "ready"
            : request.status === "DELETED"
                ? "deleted"
                : "processing";


    let statusText =
        request.status === "READY"
            ? t("ready")
            : request.status === "DELETED"
                ? t("deleted")
                : t("processing");


    return `

        <div class="request-card">

            <div class="request-top">

                <div class="request-id">
                    #${request.id}
                </div>

                <div class="status ${statusClass}">
                    ${statusText}
                </div>

            </div>


            <div class="request-info">

                <b>
                    ${request.type}
                </b>

                <br>

                ${new Date(
                    request.createdAt
                ).toLocaleString()}

                ${
                    request.type === "FLIGHT"
                        ? `
                            <br>
                            ${escapeHtml(request.from)}
                            →
                            ${escapeHtml(request.to)}
                            <br>
                            ${request.date}
                        `
                        : ""
                }

                ${
                    request.type === "VISA"
                        ? `
                            <br>
                            Barcode:
                            ${escapeHtml(request.barcode)}
                        `
                        : ""
                }

            </div>


            ${
                request.reply
                    ? `
                        <div class="reply-box">

                            <strong>
                                ${t("answer")}:
                            </strong>

                            <br>

                            ${escapeHtml(
                                request.reply
                            )}

                        </div>
                    `
                    : ""
            }


            ${
                request.status !== "DELETED"
                    ? `
                        <br>

                        <button
                            class="secondary-btn"
                            onclick="deleteRequest('${request.id}')">

                            ${t("deleted")}

                        </button>
                    `
                    : ""
            }

        </div>

    `;
}


function deleteRequest(id) {

    const requests =
        getRequests();

    const item =
        requests.find(
            x => x.id === id
        );

    if (item) {

        item.status =
            "DELETED";

        localStorage.setItem(
            "omad_requests",
            JSON.stringify(requests)
        );

        render();

    }
}


/* HELP */

function renderHelp() {

    return `

        <h1 class="page-title">
            ${t("help")}
        </h1>

        <p class="page-subtitle">
            Savolingizni yozing va kerak bo‘lsa
            rasm ham qo‘shing.
        </p>


        <div class="form-card">

            <div class="field">

                <label>
                    ${t("helpText")}
                </label>

                <textarea
                    id="helpText"
                    placeholder="Menda muammo..."></textarea>

            </div>


            <div class="field">

                <label>
                    ${t("uploadImage")}
                </label>

                <div class="file-box">

                    <input
                        id="helpImage"
                        type="file"
                        accept="image/*"
                        onchange="helpImageSelected(event)">

                </div>

            </div>


            <button
                class="primary-btn"
                onclick="submitHelp()">

                ${t("sendQuestion")}

            </button>

        </div>

    `;
}


function helpImageSelected(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    state.help.image = file;

    toast("Rasm tanlandi");
}


function submitHelp() {

    const text =
        document.getElementById("helpText")
            .value
            .trim();


    if (!text) {

        toast("Savol yozing");

        return;
    }


    const request = {

        id: generateId(),

        type: "HELP",

        text,

        createdAt:
            new Date().toISOString(),

        status: "PROCESSING"

    };


    saveRequest(request);


    sendToTelegram(
        `OMAD TOUR — YORDAM SO‘ROVI

ID: #${request.id}

${text}`
    );


    toast("Savol yuborildi");


    setTimeout(() => {
        openScreen("requests");
    }, 700);
}


/* SPECIALIST */

function renderSpecialist() {

    return `

        <h1 class="page-title">
            ${t("specialist")}
        </h1>

        <p class="page-subtitle">
            O‘zingizga qulay aloqa usulini tanlang.
        </p>


        <div class="contact-grid">

            <a
                class="contact"
                href="https://t.me/AVIAKASSA9094"
                target="_blank">

                <div class="contact-icon">
                    ${icons.telegram}
                </div>

                <div class="contact-info">
                    <strong>Telegram</strong>
                    <span>@AVIAKASSA9094</span>
                </div>

            </a>


            <a
                class="contact"
                href="https://wa.me/79379499094"
                target="_blank">

                <div class="contact-icon">
                    ${icons.whatsapp}
                </div>

                <div class="contact-info">
                    <strong>WhatsApp</strong>
                    <span>+7 937 949-90-94</span>
                </div>

            </a>


            <a
                class="contact"
                href="tel:+79379499094">

                <div class="contact-icon">
                    ${icons.phone}
                </div>

                <div class="contact-info">
                    <strong>IMO / Qo‘ng‘iroq</strong>
                    <span>+7 937 949-90-94</span>
                </div>

            </a>

        </div>

    `;
}


/* GROUPS */

function renderGroups() {

    return `

        <h1 class="page-title">
            ${t("groups")}
        </h1>


        <a
            class="link-card"
            href="https://t.me/+4RhCSj7qgnxjNWNi"
            target="_blank">

            <strong>
                Oylik biletlar narxi va qulay narx
            </strong>

            <span>
                Telegram
            </span>

        </a>


        <a
            class="link-card"
            href="https://t.me/+i8I6ByH_CUVhOWQy"
            target="_blank">

            <strong>
                O‘zbekiston Respublikasi
                Sankt-Peterburgdagi Bosh konsulxonasi
            </strong>

            <span>
                Telegram
            </span>

        </a>

    `;
}


/* ADDRESS */

function renderAddress() {

    const map =
        "https://yandex.ru/maps/org/omad_tour/106008133546?si=8720czm5kktd7kxt80d3gv6mew";


    return `

        <h1 class="page-title">
            ${t("address")}
        </h1>


        <div class="form-card">

            <div
                style="
                    text-align:center;
                    color:var(--primary);
                    margin-bottom:15px;
                ">

                ${icons.location}

            </div>


            <h3 style="text-align:center">
                OMAD TOUR
            </h3>


            <p
                style="
                    text-align:center;
                    line-height:1.6;
                    color:var(--muted);
                ">

                ${t("addressText")}

            </p>


            <button
                class="primary-btn"
                onclick="openMap()">

                Yandex Maps

            </button>

        </div>

    `;
}


function openMap() {

    window.open(
        "https://yandex.ru/maps/org/omad_tour/106008133546?si=8720czm5kktd7kxt80d3gv6mew",
        "_blank"
    );
}


/* TELEGRAM */

function sendToTelegram(text) {

    /*
       MUHIM:

       Bu yerga BOT TOKEN yozilmaydi.

       Token serverda saqlanadi.

       Telegram Mini App keyboard orqali ochilgan bo‘lsa,
       sendData ishlashi mumkin.
    */


    if (
        tg &&
        typeof tg.sendData === "function"
    ) {

        try {

            tg.sendData(
                JSON.stringify({
                    type: "OMAD_REQUEST",
                    text: text
                })
            );

        } catch (error) {

            console.error(
                "Telegram sendData error:",
                error
            );

        }

    }


    /*
       Production versiyada:

       fetch("https://YOUR-BACKEND/api/requests", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(...)
       });

       ishlatiladi.

       Bot token frontendga qo‘yilmaydi.
    */
}


/* ADMIN */

let logoClicks = 0;
let logoTimer = null;


function logoClick() {

    logoClicks++;


    clearTimeout(logoTimer);


    logoTimer =
        setTimeout(() => {

            logoClicks = 0;

        }, 1500);


    if (logoClicks >= 5) {

        logoClicks = 0;

        document
            .getElementById("adminModal")
            .classList.remove("hidden");

    }
}


function closeAdmin() {

    document
        .getElementById("adminModal")
        .classList.add("hidden");

    document.getElementById(
        "adminPassword"
    ).value = "";

    document.getElementById(
        "adminError"
    ).textContent = "";
}


function loginAdmin() {

    const password =
        document.getElementById(
            "adminPassword"
        ).value;


    /*
       MUHIM:

       Haqiqiy production loyihada
       parol frontendda saqlanmaydi.

       Bu demo frontend uchun.
    */

    if (password === "Omad2022") {

        closeAdmin();

        openScreen("admin");

    } else {

        document.getElementById(
            "adminError"
        ).textContent =
            "Parol noto‘g‘ri";

    }
}


/* ADMIN PANEL */

function renderAdmin() {

    const requests =
        getRequests();

    const total =
        requests.length;

    const processing =
        requests.filter(
            x => x.status === "PROCESSING"
        ).length;

    const ready =
        requests.filter(
            x => x.status === "READY"
        ).length;


    return `

        <h1 class="page-title">
            Admin Panel
        </h1>

        <p class="page-subtitle">
            OMAD TOUR boshqaruv paneli
        </p>


        <div class="admin-grid">

            <div class="admin-stat">

                <strong>
                    ${total}
                </strong>

                <span>
                    Jami so‘rov
                </span>

            </div>


            <div class="admin-stat">

                <strong>
                    ${processing}
                </strong>

                <span>
                    Jarayonda
                </span>

            </div>


            <div class="admin-stat">

                <strong>
                    ${ready}
                </strong>

                <span>
                    Tayyor
                </span>

            </div>


            <button
                class="primary-btn"
                onclick="openScreen('requests')">

                So‘rovlarni ko‘rish

            </button>

        </div>

    `;
}


/* UTILS */

function generateId() {

    return (
        Date.now()
            .toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 7)
    ).toUpperCase();
}


function escapeHtml(value) {

    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function toast(message) {

    const element =
        document.getElementById("toast");

    element.textContent =
        message;

    element.classList.add("show");


    setTimeout(() => {

        element.classList.remove(
            "show"
        );

    }, 2200);
}


/* START */

render();
