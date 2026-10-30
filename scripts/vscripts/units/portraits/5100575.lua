--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "units/portraits/5100575"
local b = require("lualib_bundle")
local c = b.__TS__ObjectAssign
local d = b.__TS__SourceMapTraceBack
d(
	debug.getinfo(1).short_src,
	{
		["5"] = 2,
		["6"] = 4,
		["7"] = 5,
		["8"] = 5,
		["9"] = 5,
		["11"] = 5,
		["12"] = 6,
		["15"] = 7,
		["16"] = 7,
		["17"] = 7,
		["19"] = 7,
		["20"] = 7,
		["21"] = 7,
		["23"] = 7,
		["24"] = 9,
		["25"] = 9,
		["26"] = 9,
		["28"] = 9,
		["29"] = 10,
		["32"] = 11,
		["33"] = 13,
		["34"] = 21,
		["35"] = 21,
		["36"] = 21,
		["37"] = 21,
		["39"] = 21,
		["40"] = 27,
		["41"] = 32,
		["42"] = 32,
		["43"] = 32,
		["45"] = 16,
		["46"] = 16,
		["47"] = 16,
		["48"] = 16,
		["49"] = 16,
		["50"] = 16,
		["51"] = 16,
		["52"] = 16,
		["53"] = 16,
		["54"] = 16,
		["55"] = 16,
		["56"] = 16,
		["57"] = 16,
		["58"] = 16,
		["59"] = 16,
		["60"] = 16,
		["61"] = 16,
		["62"] = 16,
		["63"] = 16,
		["64"] = 16,
		["65"] = 16,
		["66"] = 16,
		["67"] = 16,
		["68"] = 16,
		["69"] = 16,
		["70"] = 16,
		["71"] = 16,
		["72"] = 16,
		["73"] = 16,
		["74"] = 16,
		["75"] = 16,
		["76"] = 16,
		["77"] = 16,
		["78"] = 16,
		["79"] = 16,
		["81"] = 53,
		["82"] = 53,
		["86"] = 53,
		["88"] = 53,
		["89"] = 53,
		["90"] = 53,
		["92"] = 53,
		["94"] = 55,
		["95"] = 55,
		["96"] = 56,
		["97"] = 57,
		["98"] = 58,
		["99"] = 58,
		["100"] = 58,
		["102"] = 58,
		["104"] = 58,
		["105"] = 58,
		["106"] = 58,
		["108"] = 58,
		["110"] = 58,
		["111"] = 59,
		["112"] = 60,
		["113"] = 61,
		["114"] = 62,
		["116"] = 64,
		["117"] = 65,
		["118"] = 66,
		["119"] = 67,
		["123"] = 55,
		["126"] = 72,
		["127"] = 75,
		["128"] = 75,
		["129"] = 75,
		["130"] = 75,
		["131"] = 75,
		["132"] = 75,
		["133"] = 75,
		["134"] = 75,
		["135"] = 75,
		["136"] = 75,
		["137"] = 75,
		["138"] = 75,
		["139"] = 75,
		["140"] = 75,
		["141"] = 75,
		["142"] = 75,
		["143"] = 75,
		["144"] = 75,
		["145"] = 75,
		["146"] = 75,
		["147"] = 75,
		["148"] = 75,
		["149"] = 75,
		["150"] = 75,
		["151"] = 100,
		["152"] = 100,
		["153"] = 100,
		["154"] = 100,
		["155"] = 100,
		["156"] = 100,
		["157"] = 100,
		["158"] = 100,
		["159"] = 100,
		["160"] = 100,
		["161"] = 100,
		["162"] = 100,
		["163"] = 100,
		["164"] = 100,
		["165"] = 100,
		["166"] = 100,
		["167"] = 100,
		["168"] = 100,
		["169"] = 100,
		["170"] = 119,
		["171"] = 121,
		["172"] = 122,
		["174"] = 2,
	}
)
function Spawn(self, e)
	local f = "5100575"
	local g = KeyValues.UnitsKv[f]
	if g == nil then
		g = KeyValues.CosmeticsKV[f]
	end
	local h = g
	if h == nil then
		return
	end
	local i = h.portraitmodel
	if i == nil then
		i = h.Model
	end
	local j = i
	if j == nil then
		j = h.resource
	end
	local k = j
	local l = KeyValues.Portrait[k]
	if l == nil then
		l = {}
	end
	local m = c(l, KeyValues.PortraitCustom[k])
	if m == nil then
		return
	end
	local n = m.cameras.default or m.cameras.Default
	local o = {}
	local p = tostring
	local q = h.Skin
	if q == nil then
		q = ""
	end
	local r = p(q)
	local s = -1
	local t = h.portraitactivity
	if t == nil then
		t = "ACT_DOTA_CAPTURE"
	end
	local u = {
		classname = "portrait_world_unit",
		targetname = "portraitUnit",
		origin = "0 0 0",
		model = k,
		skin = r,
		EnableAutoStyles = 0,
		ModelScale = 1,
		suppress_intro_effects = 1,
		spawn_background_models = 0,
		rare_loadout_anim_chance = s,
		suppress_anim_event_sounds = 0,
		skip_pet_spawn = 0,
		flying_courier = 0,
		spawn_wearable_item_defs = 1,
		activity = t,
		activity_modifier = "",
		item_def0 = 0,
		style_index0 = 0,
		item_def1 = 0,
		style_index1 = 0,
		item_def2 = 0,
		style_index2 = 0,
		item_def3 = 0,
		style_index3 = 0,
		item_def4 = 0,
		style_index4 = 0,
		item_def5 = 0,
		style_index5 = 0,
		item_def6 = 0,
		style_index6 = 0,
		item_def7 = 0,
		style_index7 = 0,
		rendercolor = "255 255 255",
	}
	local v
	if h ~= nil then
		v = h.Creature
	end
	local w
	if v ~= nil then
		w = v.AttachWearables
	end
	local x = w
	if x == nil then
		x = {}
	end
	local y = x
	do
		local z = 0
		while z <= 9 do
			local A = "item_def" .. tostring(z)
			local B = "style_index" .. tostring(z)
			local C = h["wearable" .. tostring(z + 1)]
			if C == nil then
				local D = y[tostring(z + 1)]
				if D ~= nil then
					D = D.ItemDef
				end
				local E = D
				if E == nil then
					E = -1
				end
				C = E
			end
			local F = C
			local G = h[("wearable" .. tostring(z + 1)) .. "style"]
			u[A] = F
			if G ~= nil then
				u[B] = G
			else
				local H = KeyValues.ItemsGame[tostring(F)]
				if H ~= nil then
					if H.visuals and H.visuals.skin then
						u[B] = H.visuals.skin
					end
				end
			end
			z = z + 1
		end
	end
	table.insert(o, u)
	table.insert(
		o,
		{
			classname = "point_camera",
			targetname = "camera_1",
			origin = n.PortraitPosition,
			angles = n.PortraitAngles,
			fov = n.PortraitFOV,
			ZFar = n.PortraitFar or KeyValues.Portrait.default_entity_replacement.cameras.default.PortraitFar,
			ZNear = 4,
			UseScreenAspectRatio = 0,
			aspectRatio = 1,
			fogEnable = 0,
			fogColor = "0 0 0",
			fogStart = 2048,
			fogEnd = 4096,
			fogMaxDensity = 1,
			rendercolor = "128 128 128",
			override_shadow_farz = 0,
			dof_enabled = 0,
			dof_near_blurry = 250,
			dof_near_crisp = 550,
			dac_dof_far_crisp = 1200,
			dac_dof_far_blurry = 1600,
			dac_dof_tilt_to_ground = 0.75,
		}
	)
	table.insert(
		o,
		{
			classname = "env_global_light",
			targetname = "portrait_light",
			origin = m.PortraitLightPosition or KeyValues.Portrait.default_entity_replacement.PortraitLightPosition,
			angles = m.PortraitLightAngles or KeyValues.Portrait.default_entity_replacement.PortraitLightPosition,
			fov = m.PortraitLightFOV or KeyValues.Portrait.default_entity_replacement.PortraitLightFOV,
			nearz = m.PortraitLightDistance or KeyValues.Portrait.default_entity_replacement.PortraitLightDistance,
			Color = m.PortraitLightColor or KeyValues.Portrait.default_entity_replacement.PortraitLightColor,
			ambientcolor2 = m.PortraitShadowColor or KeyValues.Portrait.default_entity_replacement.PortraitShadowColor,
			ambientscale2 = m.PortraitShadowScale or KeyValues.Portrait.default_entity_replacement.PortraitShadowScale,
			ambientcolor1 = m.PortraitAmbientColor
				or KeyValues.Portrait.default_entity_replacement.PortraitAmbientColor,
			ambientscale1 = m.PortraitAmbientScale
				or KeyValues.Portrait.default_entity_replacement.PortraitAmbientScale,
			specularcolor = m.PortraitSpecularColor
				or KeyValues.Portrait.default_entity_replacement.PortraitSpecularColor,
			specularpower = m.PortraitSpecularPower
				or KeyValues.Portrait.default_entity_replacement.PortraitSpecularPower,
			specularangles = m.PortraitSpecularDirection
				or KeyValues.Portrait.default_entity_replacement.PortraitSpecularDirection,
			lightscale = m.PortraitLightScale or KeyValues.Portrait.default_entity_replacement.PortraitLightScale,
			groundscale = m.PortraitGroundShadowScale
				or KeyValues.Portrait.default_entity_replacement.PortraitGroundShadowScale,
			ambientangles = m.PortraitAmbientDirection
				or KeyValues.Portrait.default_entity_replacement.PortraitAmbientDirection,
		}
	)
	SpawnEntityListFromTableSynchronous(o)
	if m.PortraitParticle ~= nil then
		local I = ParticleManager:CreateParticle(m.PortraitParticle, PATTACH_ABSORIGIN_FOLLOW, thisEntity)
	end
end