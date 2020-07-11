import React from 'react'

import './form-wrapper.less'

export const FormWrapper = (props) => {

    const { legendText, children } = props

    return (
        <form>
            <fieldset className="applicationFieldset">
                <legend className="settingsFieldsetLegend"> {legendText} </legend>
                    <ul>
                        {children}
                    </ul>
            </fieldset>
        </form>
    )
}