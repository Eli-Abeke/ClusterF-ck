import React, { useContext } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { Roboto_Mono } from 'next/font/google'
import { ApplicationState } from '@/pages'
import { SupabaseProvider } from '@/pages'


export default function NoteNode(props) {
    const supabase = useContext(SupabaseProvider)
    var { CurrentState, setCurrentState, Veiwing, setVeiwing, Lightmode, setLightmode } = useContext(ApplicationState)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function overlayCheck() {
        let notes = document.querySelectorAll('.note');
        let nodes = document.querySelectorAll('.node');
        
        let rightPos = (elem) => elem.getBoundingClientRect().right;
        let leftPos = (elem) => elem.getBoundingClientRect().left;
        let topPos = (elem) => elem.getBoundingClientRect().top;
        let btmPos = (elem) => elem.getBoundingClientRect().bottom;
        var overlaps = 0
        for (let i = 0; i < nodes.length; i++) {
            
            for (let j = 0; j < notes.length; j++) {
                 
                let isOverlapping = !(
                    rightPos(nodes[i]) < leftPos(notes[j]) ||
                    leftPos(nodes[i]) > rightPos(notes[j]) ||
                    btmPos(nodes[i]) < topPos(notes[j]) ||
                    topPos(nodes[i]) > btmPos(notes[j])
                );

                if (!isOverlapping) {
                    HandleConnections([notes[j], nodes[i]], false)
                    
                }
                else {
                    sleep(1000)
                    overlaps = overlaps+1
                    HandleConnections([notes[j], nodes[i]], true)
                }

            }
            
        }
    }

    function HandleConnections(elements, create = true){
        let elem1 = elements[0].parentElement.id
        let elem2 = elements[1].parentElement.id
        let connect = props.connections
        if (create){
            let removeIndex = connect.findIndex(x => ((x.element2 === elem2) & (x.element1 === elem1)))
            if (removeIndex == -1){
                connect.push({"element1":elem1, "element2":elem2})
                props.updateConnections(connect)
                console.log(connect);

            
        }
        }
        if (!create){
            let removeIndex = connect.findIndex(x => ((x.element2 === elem2) & (x.element1 === elem1)))
            if (removeIndex !== -1){
            
            props.updateConnections(connect.splice(removeIndex,1))}
            
        
        }
    }

    const item = props.item

    async function updateCoords() {
        if (item.hasOwnProperty('content')){
        const { error } = await supabase
            .from('Notes')
            .update({x: String(((item.x/20) + 6)), y:String(((item.y/20) + 6)) })
            .eq("id", item.id)
            }
        else{
            const { error } = await supabase
            .from('Nodes')
            .update({x: String(((item.x/20) + 6)), y:String(((item.y/20) + 6)) })
            .eq("id", item.id)
        }
    }


    var newx = 0
    var newy = 0

    const x = useMotionValue(((item.x - 6) * 20))
    const y = useMotionValue(-((item.y - 6) * 20))
    const xInput = [-100, 0, 100];

    function computePosition() {
        if (typeof window !== "undefined") {
            
            var node = document.getElementById(item.id)
            if (node){
                let positions = (node.style.transform)
                let positionsparsed = positions.split(" ", -1)

                item.x=Number(positionsparsed[0].replace(/[^\d.-]/g, ''))
                item.y= Number(positionsparsed[1].replace(/[^\d.-]/g, '') * (-1))
            
        }
        }
    }

    function viewcontrol() {
        if (true) {
            setVeiwing(item)
        }

    }



    return (
        <motion.div
            className=' bg-gray-400 group h-2 w-2 transition-all relative rounded-full z-10 drop shadow-lg hover:drop-shadow-2xl '
            style={{ x, y }}
            drag
            dragConstraints={props.container}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            onDragTransitionEnd={() => (updateCoords(), overlayCheck())}
            onDrag={() => (computePosition())}
            id={item.id}
            onClick={() =>(viewcontrol())}
            
        >
            <div className={` absolute duration-300  transition-colors rounded-full
            ${(item.hasOwnProperty('content')) ? "group-hover:bg-purple-700 note top-[-4px] left-[-4px] blur-sm group-hover:blur-md  w-[16px] h-[16px] bg-slate-700/30" : "node opacity-40 group-hover:opacity-80 group-hover:bg-red-800 top-[-30px] left-[-30px] blur-lg group-hover:blur-2xl  w-[70px] h-[70px] bg-red-800/30"}`}
            />
            <div className='relative'><div className={`transition-all ${item.hasOwnProperty('content')?"": "w-0 h-0 top-0 left-0 absolute group-hover:top-[-36px] group-hover:left-[-36px] rounded-full group-hover:w-[80px] group-hover:h-[80px] border-[0px] group-hover:border-[1px]"}`}></div></div>
            <p id={item.id} className={`group-hover:w-max leading-none px-5 pt-1 group-hover:opacity-100 opacity-0 w-0 h-0 transition-colors text-white`}>{item.title}</p>
        </motion.div>
    )
}
