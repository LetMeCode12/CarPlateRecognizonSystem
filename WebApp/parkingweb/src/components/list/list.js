import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { compose } from "redux";
import "./list.scss";


class List extends Component {

    getData = (header, item, index) => {
        if (header.remove) {
            const { remove, func } = header;
            return React.cloneElement(remove,{onClick:()=>func(item)})
        } else if (header.formater) {
            return header.formater(item[header.data])
        } else if (!header.data) {
            return index + 1;
        }
        return item[header.data];
    }

    render() {
    
        const { headers, data, collapse } = this.props;
        console.log("Headers:", headers, "Data:", data)
        return (
    
            <div className="List ">
                <div className="Headers">
                    {headers.map((e) => <span>{e.name}</span>)}
                </div>
                <div className="Data" >
                    {!collapse &&
                    <>
                    {data.map((item,index)=><div className="myList">{!Object.keys(item).includes('component')?headers.map(header => <span>{this.getData(header, item, index)}</span>):item.component}</div>)}
                    </>
                    }
                </div>

            </div>
        )
    }
}

export default compose(
)(List);