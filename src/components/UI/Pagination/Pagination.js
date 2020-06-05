import React,{ Component } from "react";
import classes from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            postData: [],
            perPage: 3,
            currentPage: 0, 
            pageCount: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    componentDidMount() {
        this.receivedData()
    }

    receivedData = () => {

        // axios
        //     .get('/artworks.json?orderBy="created_date"&limitToFirst='+this.state.perPage)
        //     .then(res => {
        //         const data = res.data;
        //         this.props.parentCallback(data);
        //     });
        const data = this.props.data;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);

        this.setState({
            pageCount: Math.ceil(this.props.data.length / this.state.perPage)
        })
        this.props.parentCallback(slice);
    }


    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    render() {
        return (
            <div>
                 <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName={classes.pagination}
                    subContainerClassName={"pages pagination"}
                    activeClassName={classes.active}/>
            </div>
        )
    }

}

export default Pagination;