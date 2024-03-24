import { Link } from "react-router-dom"

export default function ListReports(props) {

    const { id, img, title, description, report } = props

    return (
        <Link
            to={`/report/${id}`}
            state={{ img: img, title: title, description: description, report: report }}
        >
            <div className="w-full mt-8">
                <img alt={title} className="w-[350px] h-[200px]" style={{ borderRadius: 6 }} src={img} />
                <div className="font-semibold text-base line-clamp-2 mb-4 mt-4">{title}</div>
                <div className="font-semibold text-xs light-gray">{report}</div>
            </div>
        </Link>
    )
}