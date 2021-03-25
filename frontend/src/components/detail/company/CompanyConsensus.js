import React from 'react'

function ConsensusValue({values}) {
    return(values.map(value =>
            <div class="mr-10 text-3xl">
                {value}
            </div>
        ))
}

function CompanyConsensus() {
    const values = ["per", "roe", "eps", "pbr", "etc"];
    return (
        <div class="w-9/12 m-auto flex justify-around mt-10">
            <ConsensusValue values={values} />
        </div>
    )
}

export default CompanyConsensus
