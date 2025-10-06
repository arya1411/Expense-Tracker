const InfoCard = ({icon , label , value ,   color}) => {
    return (
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className={`w-12 h-12 flex items-center justify-center text-xl text-white ${color} rounded-lg`}>
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-xl font-semibold text-white">${value}</p>   
            </div>
        </div>
    )
};

export default InfoCard
