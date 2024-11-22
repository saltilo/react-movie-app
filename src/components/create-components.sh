
components=(
  "Tabs"
  "SearchTab"
  "RatedTab"
  "SearchBar"
  "MovieList"
  "MovieCard"
  "Pagination"
)


for component in "${components[@]}"; do

  mkdir -p "$component"
  

  cat <<EOL > "$component/$component.js"
import React from 'react';
import './$component.css';

const $component = () => {
  return (
    <div className="$component">
      {/* $component component */}
    </div>
  );
};

export default $component;
EOL

  touch "$component/$component.css"
done

echo "Компоненты созданы успешно!"