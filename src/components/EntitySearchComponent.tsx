"use client"

import React from "react";
import Select from "react-tailwindcss-select";

type Props = {
    entities: {
        id: number,
        name: string
    }[],
    selectedEntities: {
        id: number,
        name: string
    }[],
    setSelectedEntities: (entities: {id: number, name: string}[]) => void
}

export function EntitySearchComponent(props: Props) {
    function handleChange(event: any) {
        if (event === null) {
            props.setSelectedEntities([]);
            return;
        }

        props.setSelectedEntities(event.map((entity: {value: string, label: string}) => {
            return {
                id: parseInt(entity.value),
                name: entity.label
            }
        }));
    }

    return (
        <div>
            <Select
                placeholder={"Search entities"}
                options={props.entities.map((entity) => {
                    return {
                        value: entity.id.toString(),
                        label: entity.name
                    }
                })}
                onChange={(e) => handleChange(e)}
                value={props.selectedEntities.map((entity) => {
                    return {
                        value: entity.id.toString(),
                        label: entity.name
                    }
                })}
                primaryColor={"gray"}
                isSearchable={true}
                isMultiple={true}
            />
        </div>
    );
}