function CoursesRowComponent(props) {
    return (
        <tr>
            <td>{props.course.code}</td>
            <td>{props.course.name}</td>
            <td>{props.course.instructor}</td>
            <td>{props.course.time}</td>
            <td><button onClick={() => props.setOpenPop(!props.openPop)}>Kayıt Ol</button>
            </td>

        </tr>
    );
}

export default CoursesRowComponent;