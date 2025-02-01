// imports
import { useParams } from "react-router"
import { updateSettings } from "../../services/settingsService"
import gameGenres from "../../data/gameGenres"
import './SettingsComponent.css'

// component
const SettingsComponent = ({ settings, setSettings }) => {
    const { userId } = useParams()
    
    //handler functions
    const handleCheckboxChange = async (evt) => {
        await setSettings((prev) => {
            if (evt.target.name === "media") {
                const selectedMedia = evt.target.value
                const updatedMedia = prev.media.includes(selectedMedia) 
                  ? prev.media.filter(media => media !== selectedMedia)
                  : [...prev.media, selectedMedia]

                return {
                    ...prev,
                    media: updatedMedia
                }
            } else {
                const updatedGenres = [...prev.genre]
                if (updatedGenres.includes(evt.target.name)) {
                    return {
                        ...prev,
                        genre: updatedGenres.filter(genre => genre !== evt.target.name),
                    }
                } else {
                    return {
                        ...prev,
                        genre: [...updatedGenres, evt.target.name],
                    }
                }
            }
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        await updateSettings(userId, settings)
    }

    // return
    return (
        <form onSubmit={handleSubmit} className="settings-form">
            <div className="settings-section">
                <h3 className="section-heading">Medium</h3>
                <label className="checkbox-label large-checkbox">
                    <input 
                      type="checkbox" 
                      name="VideoGames"
                      checked={true}
                      disabled 
                    />
                    Video Games
                </label>
            </div>
            <div className="settings-sections">
                <h3 className="section-heading">Genres</h3> 
                <div className="checkbox-grid">  
                    {gameGenres.map((genre) => (
                        <label key={genre.id} htmlFor={genre.name} className="checkbox-label">
                            <input 
                              type="checkbox" 
                              name={genre.name} 
                              id={genre.id}
                              onChange={handleCheckboxChange}
                              checked={settings.genre ? settings.genre.includes(genre.name) : false }
                            />
                            {genre.name}
                        </label>
                    ))}
                </div>
            </div>
            <button type="submit" className="save-btn">Save Settings</button>
        </form>
    )
}

// export
export default SettingsComponent