<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Tree House Recipes</title>
		
		<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
		<script src="https://code.jquery.com/jquery-migrate-3.3.1.min.js"></script>
		<script src="scripts/jquery.flexslider-min.js"></script>
		
		<link rel="stylesheet" href="recipes-stylesheet.css">
		<script src="recipes-scripts.js"></script>
	</head>

	<body>
		<div id="body-wrapper">
			<header>
				<h1>Tree House Recipes</h1>
			</header>
			
			<div id="filters-container" class="filters-container">
				<div id="filters-wrapper" class="filters-wrapper">
					<div id="filters" class="filters">
						<div class="filter ingredient-filter">
							<label for="ingredients">Main ingredient:</label>
							<select id="ingredients" name="ingredients">
								<option>Select...</option>
								<option value="chicken">Chicken</option>
								<option value="shrimp">Shrimp</option>
								<option value="fish">Fish</option>
							</select>
						</div>
						<div class="filter restrictions-filter">
							<label for="restrictions">Dietary restrictions:</label>
							<select id="restrictions" name="restrictions">
								<option>Select...</option>
								<option value="vegetarian">Vegetarian</option>
								<option value="gluten-free">Gluten-free</option>
								<option value="vegan">Vegan</option>
								<option value="dairy-free">Dairy-free</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div id="list-container" class="list-container">
				<div id="list-wrapper" class="list-wrapper">
					<div id="recipe01" class="list-item recipe01">
						<div class="recipe-name">Recipe 01</div>
						<a class="recipe-link" href="#"></a>
					</div>
					<div id="recipe02" class="list-item recipe02">
						<div class="recipe-name">Recipe 02</div>
						<a class="recipe-link" href="#"></a>
					</div>
					<div id="recipe03" class="list-item recipe03">
						<div class="recipe-name">Recipe 03</div>
						<a class="recipe-link" href="#"></a>
					</div>
					<div id="recipe04" class="list-item recipe04">
						<div class="recipe-name">Recipe 04</div>
						<a class="recipe-link" href="#"></a>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>