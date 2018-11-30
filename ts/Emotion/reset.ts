import { injectGlobal } from 'emotion';

// RESET CSS.
injectGlobal(`
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font: inherit;
		vertical-align: baseline;
		//max-width: 100%;
	}
	* {
		box-sizing: border-box;
		&, &:hover, &:active {
			border-width: 0px;
			outline-width: 0px;
		}
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	html, body {
		min-height: 100%;
		min-width: 100%;
		font-size: 14px;
		font-family: Arial, Helvetica, sans-serif;
		background-color: white;
		overflow: auto;
		margin: 0px;
	}

	html {
		height: 100%;
		line-height: 1.4;
	}

	input[type='text'], input[type='password'], textarea {
		&, &:focus {
			outline: 0px;
			resize: none;
		}
	}

	a, a:active, a:hover{
		text-decoration: none;
	}
`);

// Normalization goes here...
injectGlobal(`
	body {
		color: #333;
	}
	h1 {
		font-size: 36px;
	}
	
	h2 {
		font-size: 30px;
	}
	
	h3 {
		font-size: 24px;
	}
	
	h4 {
		font-size: 18px;
	}
	
	/* Won't be used here */
	
	h5 {
		font-size: 14px;
	}
	
	h6 {
		font-size: 12px;
	}
	
	b {
		font-weight: 900;
	}
	
	i {
		font-style: italic;
	}
	
	h1, h2, h3, h4, h5, h6{
		margin-top:5px;
		margin-bottom:5px;
	}
`);