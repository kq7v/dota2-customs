--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "units/full_body/5100079"
local b = require("lualib_bundle")
local c = b.__TS__SourceMapTraceBack
c(
	debug.getinfo(1).short_src,
	{
		["4"] = 2,
		["5"] = 4,
		["6"] = 5,
		["7"] = 5,
		["8"] = 5,
		["10"] = 5,
		["11"] = 6,
		["14"] = 7,
		["15"] = 7,
		["16"] = 7,
		["18"] = 7,
		["19"] = 7,
		["20"] = 7,
		["22"] = 7,
		["23"] = 8,
		["26"] = 9,
		["27"] = 10,
		["28"] = 11,
		["29"] = 12,
		["31"] = 14,
		["32"] = 21,
		["33"] = 21,
		["34"] = 21,
		["36"] = 22,
		["37"] = 22,
		["38"] = 22,
		["39"] = 22,
		["41"] = 22,
		["42"] = 25,
		["43"] = 25,
		["45"] = 25,
		["46"] = 25,
		["48"] = 25,
		["50"] = 25,
		["51"] = 25,
		["52"] = 25,
		["54"] = 17,
		["55"] = 17,
		["56"] = 17,
		["57"] = 17,
		["58"] = 17,
		["59"] = 17,
		["60"] = 17,
		["61"] = 17,
		["62"] = 17,
		["63"] = 17,
		["64"] = 17,
		["65"] = 17,
		["66"] = 17,
		["67"] = 17,
		["68"] = 17,
		["69"] = 17,
		["70"] = 17,
		["71"] = 17,
		["72"] = 17,
		["73"] = 17,
		["74"] = 17,
		["75"] = 17,
		["76"] = 17,
		["77"] = 17,
		["78"] = 17,
		["79"] = 17,
		["80"] = 17,
		["81"] = 17,
		["82"] = 17,
		["83"] = 17,
		["84"] = 17,
		["85"] = 17,
		["86"] = 17,
		["87"] = 17,
		["88"] = 17,
		["90"] = 54,
		["91"] = 54,
		["95"] = 54,
		["97"] = 54,
		["98"] = 54,
		["99"] = 54,
		["101"] = 54,
		["103"] = 56,
		["104"] = 56,
		["105"] = 57,
		["106"] = 58,
		["107"] = 59,
		["108"] = 59,
		["109"] = 59,
		["111"] = 59,
		["113"] = 59,
		["114"] = 59,
		["115"] = 59,
		["117"] = 59,
		["119"] = 59,
		["120"] = 60,
		["121"] = 61,
		["122"] = 62,
		["123"] = 63,
		["125"] = 65,
		["126"] = 66,
		["127"] = 67,
		["128"] = 68,
		["132"] = 56,
		["135"] = 73,
		["136"] = 76,
		["137"] = 76,
		["138"] = 76,
		["139"] = 76,
		["140"] = 76,
		["141"] = 76,
		["142"] = 76,
		["143"] = 76,
		["144"] = 76,
		["145"] = 76,
		["146"] = 76,
		["147"] = 76,
		["148"] = 76,
		["149"] = 76,
		["150"] = 76,
		["151"] = 76,
		["152"] = 76,
		["153"] = 76,
		["154"] = 76,
		["155"] = 76,
		["156"] = 76,
		["157"] = 76,
		["158"] = 76,
		["159"] = 76,
		["160"] = 101,
		["161"] = 101,
		["162"] = 101,
		["163"] = 101,
		["164"] = 101,
		["165"] = 101,
		["166"] = 101,
		["167"] = 101,
		["168"] = 101,
		["169"] = 101,
		["170"] = 101,
		["171"] = 101,
		["172"] = 101,
		["173"] = 101,
		["174"] = 101,
		["175"] = 101,
		["176"] = 101,
		["177"] = 101,
		["178"] = 101,
		["179"] = 129,
		["180"] = 131,
		["181"] = 132,
		["183"] = 2,
	}
)
function Spawn(self, d)
	local e = "5100079"
	local f = KeyValues.UnitsKv[e]
	if f == nil then
		f = KeyValues.CosmeticsKV[e]
	end
	local g = f
	if g == nil then
		return
	end
	local h = KeyValues.PortraitFullBody[g.FullBody]
	if h == nil then
		h = KeyValues.PortraitFullBody[g.portrait]
	end
	local i = h
	if i == nil then
		i = KeyValues.PortraitFullBody[e]
	end
	local j = i
	if j == nil then
		return
	end
	local k = j.cameras.default or j.cameras.Default
	local l
	if g.portrait and g.hero and KeyValues.HeroIDCache[g.hero] then
		l = KeyValues.UnitsKv[KeyValues.HeroIDCache[g.hero]]
	end
	local m = {}
	local n = g.Model
	if n == nil then
		n = g.resource
	end
	local o = tostring
	local p = g.Skin
	if p == nil then
		p = ""
	end
	local q = o(p)
	local r = g.FullBodyModelScale
	if r == nil then
		local s
		if l ~= nil then
			s = l.FullBodyModelScale
		end
		r = s
	end
	local t = r
	if t == nil then
		t = 1
	end
	local u = {
		classname = "portrait_world_unit",
		parentname = "root",
		origin = "0 0 0",
		model = n,
		skin = q,
		EnableAutoStyles = 0,
		ModelScale = t,
		suppress_intro_effects = 1,
		spawn_background_models = 0,
		rare_loadout_anim_chance = -1,
		suppress_anim_event_sounds = 0,
		skip_pet_spawn = 0,
		flying_courier = 0,
		spawn_wearable_item_defs = 1,
		activity = "ACT_DOTA_LOADOUT",
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
	if g ~= nil then
		v = g.Creature
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
			local C = g["wearable" .. tostring(z + 1)]
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
			local G = g[("wearable" .. tostring(z + 1)) .. "style"]
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
	table.insert(m, u)
	table.insert(
		m,
		{
			classname = "point_camera",
			targetname = "camera_1",
			origin = k.PortraitPosition,
			angles = k.PortraitAngles,
			fov = k.PortraitFOV,
			ZFar = k.PortraitFar or KeyValues.Portrait.default_entity_replacement.cameras.default.PortraitFar,
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
		m,
		{
			classname = "env_global_light",
			targetname = "portrait_light",
			origin = j.PortraitLightPosition or KeyValues.Portrait.default_entity_replacement.PortraitLightPosition,
			angles = j.PortraitLightAngles or KeyValues.Portrait.default_entity_replacement.PortraitLightPosition,
			fov = j.PortraitLightFOV or KeyValues.Portrait.default_entity_replacement.PortraitLightFOV,
			nearz = j.PortraitLightDistance or KeyValues.Portrait.default_entity_replacement.PortraitLightDistance,
			Color = j.PortraitLightColor or KeyValues.Portrait.default_entity_replacement.PortraitLightColor,
			ambientcolor2 = j.PortraitShadowColor or KeyValues.Portrait.default_entity_replacement.PortraitShadowColor,
			ambientscale2 = j.PortraitShadowScale or KeyValues.Portrait.default_entity_replacement.PortraitShadowScale,
			ambientcolor1 = j.PortraitAmbientColor
				or KeyValues.Portrait.default_entity_replacement.PortraitAmbientColor,
			ambientscale1 = j.PortraitAmbientScale
				or KeyValues.Portrait.default_entity_replacement.PortraitAmbientScale,
			specularcolor = j.PortraitSpecularColor
				or KeyValues.Portrait.default_entity_replacement.PortraitSpecularColor,
			specularpower = j.PortraitSpecularPower
				or KeyValues.Portrait.default_entity_replacement.PortraitSpecularPower,
			specularangles = j.PortraitSpecularDirection
				or KeyValues.Portrait.default_entity_replacement.PortraitSpecularDirection,
			lightscale = j.PortraitLightScale or KeyValues.Portrait.default_entity_replacement.PortraitLightScale,
			groundscale = j.PortraitGroundShadowScale
				or KeyValues.Portrait.default_entity_replacement.PortraitGroundShadowScale,
			ambientangles = j.PortraitAmbientDirection
				or KeyValues.Portrait.default_entity_replacement.PortraitAmbientDirection,
		}
	)
	SpawnEntityListFromTableSynchronous(m)
	if j.PortraitParticle ~= nil then
		local I = ParticleManager:CreateParticle(j.PortraitParticle, PATTACH_ABSORIGIN_FOLLOW, thisEntity)
	end
end