import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import './Category.css'
import { db } from '../../config/firebase';
import TimerBlock from '../TimerItem/TimerItem.js';

function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesRef = collection(db, 'categories');
                const categoriesSnapshot = await getDocs(categoriesRef);

                const categoriesList = [];

                for (const doc of categoriesSnapshot.docs) {
                    const categoryData = doc.data();
                    const categoryId = doc.id;

                    const timerRef = collection(db, `categories/${categoryId}/timers`);
                    const timerSnapshot = await getDocs(timerRef);

                    const timerList = timerSnapshot.docs.map(timerDoc => ({
                        id: timerDoc.id,
                        ...timerDoc.data(),
                    }));

                    categoriesList.push({
                        id: categoryId,
                        name: categoryData.name,
                        timers: timerList
                    });
                }

                const additionalCategory = categoriesList.find(category => category.name === 'Additional');
                const regularCategories = categoriesList.filter(category => category.name !== 'Additional');

                regularCategories.sort((a, b) => a.name.localeCompare(b.name));

                regularCategories.forEach(category => {
                    category.timers.sort((a, b) => a.time - b.time);
                });

                if (additionalCategory) {
                    categoriesList.length = 0;  
                    categoriesList.push(...regularCategories, additionalCategory); 
                } else {
                    categoriesList.push(...regularCategories); 
                }

                setCategories(categoriesList);
            } catch (error) {
                console.error("Error fetching categories:", error);               
            }
        };

        fetchCategories();
    }, []);

  return (
    <div className='container'>
        <div>
            {categories.map(category => (
                <div key={category.id} className='category'>
                    <h2>{category.name}</h2>
                    <div className='timer-list'>
                        {category.timers.map(timer => (
                            <TimerBlock key={timer.id} name={timer.name} time={timer.time} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Category;