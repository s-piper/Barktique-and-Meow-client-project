

// function for create employee button
function AdminCreateButton() {

    // function to handle add employee click
    const handleClick = () => {
        // console log to see button fires on click
        console.log('Clicked Add Employee');
    }

    return (
        <div>
            <button
                onClick={handleClick}
            >
                Create Employee
            </button>
        </div>
    )
} // end AdminCreateButton

// export AdminCreateButton
export default AdminCreateButton;