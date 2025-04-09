const lessons = [
	{
	  id: "1",
	  title: "Introduction to Graphic Design",
	  videoUrl: "https://www.youtube.com/embed/WONZVnlam6U?si=DZYTno9ZXivrlxWI",
	  content: `
		<div class="space-y-4 text-gray-800">
		  <h2 class="text-2xl font-bold text-gray-900">What is Graphic Design?</h2>
		  <p>Graphic design is the craft of creating visual content to communicate messages. Using typography, imagery, color, and layout, designers create everything from logos and branding to marketing materials and digital assets.</p>
		  <p>Design can be found in print, digital interfaces, product packaging, advertising, and much more. Good design enhances usability, improves user experience, and conveys meaning clearly.</p>
		  <h3 class="text-xl font-semibold text-gray-900 mt-6">Core Concepts</h3>
		  <ul class="list-disc list-inside space-y-1">
			<li>Visual hierarchy</li>
			<li>Balance and alignment</li>
			<li>Contrast and repetition</li>
			<li>Proximity and whitespace</li>
		  </ul>
		</div>
	  `,
	  isCompleted: false,
	  quiz: {
		question: "Which of the following is NOT a basic principle of design?",
		options: ["Balance", "Contrast", "HTML Structure", "Proximity"],
		correctAnswerIndex: 2,
	  },
	},
	{
	  id: "2",
	  title: "Understanding Color Theory",
	  videoUrl: "https://www.youtube.com/embed/dFSia1LZI4Y?si=VshjEI3hOhmHmeu0",
	  content: `
		<div class="space-y-4 text-gray-800">
		  <h2 class="text-2xl font-bold text-gray-900">Color Theory Basics</h2>
		  <p>Color theory is a conceptual framework used by designers to understand how colors interact. It helps in choosing harmonious color combinations and evoking the desired emotional responses from viewers.</p>
		  <p>The color wheel is a visual representation of primary, secondary, and tertiary colors. Designers use it to build palettes and maintain color consistency across designs.</p>
		  <h3 class="text-xl font-semibold text-gray-900 mt-6">Types of Colors</h3>
		  <ul class="list-disc list-inside space-y-1">
			<li><strong>Primary:</strong> Red, Blue, Yellow</li>
			<li><strong>Secondary:</strong> Green, Orange, Purple</li>
			<li><strong>Tertiary:</strong> Created by mixing a primary with a secondary (e.g., Blue-Green)</li>
		  </ul>
		</div>
	  `,
	  isCompleted: false,
	  quiz: {
		question: "Which color is a secondary color?",
		options: ["Red", "Yellow", "Green", "Blue"],
		correctAnswerIndex: 2,
	  },
	},
	{
	  id: "3",
	  title: "Typography Basics",
	  videoUrl: "https://www.youtube.com/embed/F0PTse89XIE?si=9ohTs4Ygsld4woSd",
	  content: `
		<div class="space-y-4 text-gray-800">
		  <h2 class="text-2xl font-bold text-gray-900">What is Typography?</h2>
		  <p>Typography is the art of arranging type to make written language legible, readable, and visually appealing. It plays a critical role in setting the tone and voice of your design.</p>
		  <h3 class="text-xl font-semibold text-gray-900 mt-6">Key Elements of Typography</h3>
		  <ul class="list-disc list-inside space-y-1">
			<li><strong>Font Families:</strong> Serif (e.g., Times New Roman), Sans-serif (e.g., Arial), Monospace (e.g., Courier)</li>
			<li><strong>Spacing:</strong> Includes line height (leading), letter spacing (tracking), and kerning (space between specific characters)</li>
			<li><strong>Hierarchy:</strong> Using type size, weight, and contrast to guide the reader’s attention</li>
		  </ul>
		</div>
	  `,
	  isCompleted: false,
	  quiz: {
		question: "Which of the following is a Sans-serif font?",
		options: ["Times New Roman", "Georgia", "Arial", "Courier"],
		correctAnswerIndex: 2,
	  },
	},
	{
	  id: "4",
	  title: "Working with Layouts and Grids",
	  videoUrl: "https://www.youtube.com/embed/byDNMLTuOqI?si=775n0a5_smdLfwG7",
	  content: `
		<div class="space-y-4 text-gray-800">
		  <h2 class="text-2xl font-bold text-gray-900">Layouts and Grid Systems</h2>
		  <p>Layouts determine how elements are arranged within a design. A well-structured layout improves the user experience and readability of your content.</p>
		  <p>Grids provide a consistent structure and alignment, which is especially useful in responsive design. Most modern web design systems use 12-column grids for flexibility.</p>
		  <h3 class="text-xl font-semibold text-gray-900 mt-6">Why Use Grids?</h3>
		  <ul class="list-disc list-inside space-y-1">
			<li>Ensures consistent alignment of elements</li>
			<li>Improves readability and visual balance</li>
			<li>Facilitates scalability across screen sizes</li>
		  </ul>
		</div>
	  `,
	  isCompleted: false,
	  quiz: {
		question: "Why are grids important in layout design?",
		options: [
		  "They make the content colorful",
		  "They help align and organize elements",
		  "They reduce loading time",
		  "They are mandatory in HTML",
		],
		correctAnswerIndex: 1,
	  },
	},
  ];
export default lessons