import React from 'react'

import './select-list-difficulty.less'

export const SelectListDifficulty = () => {

    return (
        <div className="difficultySelectWrapper">
                <select className="difficulty_select" name="difficulty">
                    <option value="Easy">1 level?</option>
                    <option value="Medium">2 level?</option>
                    <option value="Hard">3 level?</option>
                </select>
        </div>
    )
}