// FamilyCircle.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../FamilyCircle/FamilyCircle.css'; // Ensure the CSS file exists

const children = [
  { name: 'Child 3', image: 'path_to_child_image_1' },
  { name: 'Child 4', image: 'path_to_child_image_2' },
  { name: 'Child 5', image: 'path_to_child_image_3' },
  { name: 'Child 6', image: 'path_to_child_image_4' },
  { name: 'Child 7', image: 'path_to_child_image_5' },
  { name: 'Child 8', image: 'path_to_child_image_6' },
  { name: 'Child 9', image: 'path_to_child_image_7' },
  { name: 'Child 10', image: 'path_to_child_image_8' },
  { name: 'Child 11', image: 'path_to_child_image_9' },
  { name: 'PJ Joseph', image: 'path_to_child_image_10' },
  { name: 'Child 1', image: 'path_to_child_image_11' },
  { name: 'Child 2', image: 'path_to_child_image_12' }, // New child
];

const FamilyCircle = () => {
  return (
    <div className="circle-container">
      {children.map((child, index) => (
        <Link key={index} to={`/child/${index}`} className={`circle-card card-${index}`}>
          <img src={child.image} alt={child.name} />
          <p>{child.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default FamilyCircle;
