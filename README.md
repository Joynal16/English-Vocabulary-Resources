# English Janala — Vocabulary Learning

English Janala is a lightweight English vocabulary learning site for Bengali
speakers. Browse vocabulary by lesson, look up a word, hear its pronunciation,
and review meanings and examples in a responsive interface.

**Live site:** After the first successful GitHub Pages deployment, open
`https://<your-github-username>.github.io/English-Vocabulary-Resources/`.

## Features

- Demo sign-in page with a simple, client-side login flow
- Vocabulary lessons loaded from the Programming Hero API
- Search across the available vocabulary
- Word details, including meaning, pronunciation, examples, and synonyms
- Browser text-to-speech pronunciation
- Light and dark themes, with the selected theme saved in the browser
- Responsive layout and Bengali-friendly typography

## Run locally

1. Install [Git](https://git-scm.com/downloads) and a modern browser.
2. Clone the repository and enter its folder:

   ```powershell
   git clone https://github.com/<your-github-username>/English-Vocabulary-Resources.git
   cd English-Vocabulary-Resources
   ```

3. Start a local web server from the project folder. For example, with Python:

   ```powershell
   py -m http.server 8000
   ```

   Or use the **Live Server** extension in Visual Studio Code.

4. Open [http://localhost:8000](http://localhost:8000) in your browser.
5. On the sign-in page, use the demo credentials:

   - Number: `12345678910`
   - PIN: `1234`

6. Choose a lesson or search for a word. Select the information button for
   details, or the speaker button to hear a word.

> **Demo sign-in only:** The credentials are hard-coded in the browser and do
> not provide real authentication or protect user data. Do not enter personal
> information.


## Project structure

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml       # GitHub Pages deployment
├── assets/                 # Logo, illustrations, and icons
├── Script/
│   ├── index.js            # Lessons, search, and word details
│   └── login.js            # Demo sign-in flow
├── home.html               # Vocabulary learning page
├── index.html              # Sign-in page
└── style.css               # Additional styles
```

## Technologies and services

- HTML, CSS, and vanilla JavaScript
- Tailwind CSS and daisyUI, loaded from CDNs
- Font Awesome and Google Fonts
- GitHub Actions and GitHub Pages for deployment

The site has no package installation or build step. An internet connection is
needed for the external styles, fonts, and vocabulary API. Word audio uses the
browser's Web Speech API and depends on the browser's available voices.
