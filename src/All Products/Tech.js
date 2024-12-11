const Tech = ({selectedTech}) => {
    return ( 
        <div>
        <p className="md:hidden flex">{selectedTech.name}</p>
        <p className="md:flex hidden">{selectedTech.tech}</p>
        </div>
     );
}
 
export default Tech;